// Code is based on https://github.com/BinomialLLC/basis_universal/blob/master/webgl/encode_test/index.html

import type {
  EncodingMessageFromWorker,
  TranscodingMessageFromWorker,
  ErrorMessageFromWorker,
  MessageToWorker,
} from "./basisTypes";

self.addEventListener(
  "message",
  async (message: MessageEvent<MessageToWorker>) => {
    const basis = await (0, eval)(message.data.basisEncoderJS)();
    switch (message.data.mode) {
      case "encode": {
        const { BasisEncoder, initializeBasis } = basis;

        for (const { name, image } of message.data.data) {
          const imageData = new Uint8Array(await image.arrayBuffer());
          initializeBasis();

          const basisFileData = new Uint8Array(1024 * 1024 * 10);
          const basisEncoder = new BasisEncoder();

          basisEncoder.setSliceSourceImage(0, imageData, 0, 0, true);
          basisEncoder.setComputeStats(false);
          basisEncoder.setPerceptual(true);
          basisEncoder.setMipSRGB(true);
          basisEncoder.setQualityLevel(255);
          basisEncoder.setUASTC(true);
          basisEncoder.setMipGen(false);

          const outputBytes = basisEncoder.encode(basisFileData);
          const actualBasisData = new Uint8Array(
            basisFileData.buffer,
            0,
            outputBytes
          );

          basisEncoder.delete();

          if (outputBytes === 0) {
            const error: ErrorMessageFromWorker = {
              status: "error",
              reason: "Failed to convert image to .basis",
            };

            postMessage(error);
            return;
          }

          const message: EncodingMessageFromWorker = {
            status: "success",
            name,
            data: actualBasisData,
          };
          postMessage(message);
        }

        return;
      }

      case "transcode": {
        const { BasisFile, initializeBasis } = basis;
        const canvas = message.data.canvas;
        const gl = canvas.getContext("webgl");
        const webglSupported = gl !== null;

        if (!webglSupported) {
          const error: ErrorMessageFromWorker = {
            status: "error",
            reason: "WebGL not supported",
          };

          postMessage(error);
          return;
        }

        const astcSupported =
          gl.getExtension("WEBGL_compressed_texture_astc") !== null;
        const etcSupported =
          gl.getExtension("WEBGL_compressed_texture_etc1") !== null;
        const dxtSupported =
          gl.getExtension("WEBGL_compressed_texture_s3tc") !== null;
        const pvrtcSupported =
          gl.getExtension("WEBGL_compressed_texture_pvrtc") !== null ||
          gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc") !== null;
        const bc7Supported =
          gl.getExtension("EXT_texture_compression_bptc") !== null;

        const uniformLocations: Record<string, number | null> = {};
        const attributeLocations: Record<string, number | null> = {};

        const quadBuffer = gl.createBuffer();
        if (quadBuffer === null) {
          throw new Error("Could not create WebGL buffer");
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([
            -1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0,
          ]),
          gl.STATIC_DRAW
        );

        const vertexShader = compileShader(
          gl,
          `
          precision highp float;
          attribute vec4 position;
          varying vec2 varyingUV;
          void main(){
            gl_Position = vec4(position.xy, 0.0, 1.0);
            varyingUV = position.zw;
          }
        `,
          gl.VERTEX_SHADER
        );
        const fragmentShader = compileShader(
          gl,
          `
          precision highp float;
          uniform sampler2D textureSampler;
          uniform vec4 control;
          varying vec2 varyingUV;
          void main(){
            vec4 colour;
            colour = texture2D(textureSampler, varyingUV);
            if(control.x > 0.0){
              colour.w = 1.0;
            }
            else if(control.y > 0.0){
              colour.rgb = colour.aaa;
              colour.w = 1.0;
            }
            gl_FragColor = colour;
          }
        `,
          gl.FRAGMENT_SHADER
        );

        const program = gl.createProgram();
        if (program === null) {
          throw new Error("Could not create WebGL program");
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);
        gl.useProgram(program);

        const positionAttributeLocation = gl.getAttribLocation(
          program,
          "position"
        );

        gl.bindAttribLocation(program, positionAttributeLocation, "position");
        gl.enableVertexAttribArray(positionAttributeLocation);

        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        const uniformCount = gl.getProgramParameter(
          program,
          gl.ACTIVE_UNIFORMS
        );

        for (let i = 0; i < uniformCount; i++) {
          const info = gl.getActiveUniform(program, i);

          if (info === null) {
            throw new Error(`Could not get uniform info for uniform ${i}`);
          }

          const result = gl.getUniformLocation(program, info.name);
          uniformLocations[info.name] = result as number;
        }

        const attributeCount = gl.getProgramParameter(
          program,
          gl.ACTIVE_ATTRIBUTES
        );
        for (let i = 0; i < attributeCount; i++) {
          const info = gl.getActiveAttrib(program, i);

          if (info === null) {
            throw new Error(`Could not get attribute for attribute ${i}`);
          }

          const result = gl.getAttribLocation(program, info.name);
          attributeLocations[info.name] = result;
        }

        //#endregion

        for (const { name, file } of message.data.data) {
          initializeBasis();

          const data = new Uint8Array(await file.arrayBuffer());
          const basisFile = new BasisFile(data);
          const width: number = basisFile.getImageWidth(0, 0);
          const height: number = basisFile.getImageHeight(0, 0);
          const hasAlpha = basisFile.getHasAlpha();

          if (!width || !height) {
            const error: ErrorMessageFromWorker = {
              status: "error",
              reason: "Invalid basis file",
            };

            postMessage(error);
            return;
          }

          const format = astcSupported
            ? BASIS_FORMAT.cTFASTC_4x4
            : bc7Supported
              ? BASIS_FORMAT.cTFBC7
              : dxtSupported
                ? hasAlpha
                  ? BASIS_FORMAT.cTFBC3
                  : BASIS_FORMAT.cTFBC1
                : pvrtcSupported
                  ? hasAlpha
                    ? BASIS_FORMAT.cTFPVRTC1_4_RGBA
                    : BASIS_FORMAT.cTFPVRTC1_4_RGB
                  : etcSupported
                    ? BASIS_FORMAT.cTFETC1
                    : BASIS_FORMAT.cTFRGB565;
          if (
            (format === BASIS_FORMAT.cTFPVRTC1_4_RGBA ||
              format === BASIS_FORMAT.cTFPVRTC1_4_RGB) &&
            ((width & (width - 1)) != 0 ||
              (height & (height - 1)) != 0 ||
              width !== height)
          ) {
            const error: ErrorMessageFromWorker = {
              status: "error",
              reason: "PVRTC1 requires square power of 2 textures",
            };

            postMessage(error);
            return;
          }

          if (!basisFile.startTranscoding()) {
            basisFile.close();
            basisFile.delete();

            const error: ErrorMessageFromWorker = {
              status: "error",
              reason: "Transcoding failed",
            };

            postMessage(error);
            return;
          }

          const destination = new Uint8Array(
            basisFile.getImageTranscodedSizeInBytes(0, 0, format)
          );

          if (!basisFile.transcodeImage(destination, 0, 0, format, 0, 0)) {
            if (!basisFile.startTranscoding()) {
              basisFile.close();
              basisFile.delete();

              const error: ErrorMessageFromWorker = {
                status: "error",
                reason: "Transcoding failed",
              };

              postMessage(error);
              return;
            }
          }

          basisFile.close();
          basisFile.delete();

          const alignedWidth = (width + 3) & ~3;
          const alignedHeight = (height + 3) & ~3;

          let displayWidth = alignedWidth;
          let displayHeight = alignedHeight;
          canvas.width = alignedWidth;
          canvas.height = alignedHeight;

          let textureOrError: WebGLTexture | Error;

          switch (format) {
            case BASIS_FORMAT.cTFASTC_4x4:
              textureOrError = createCompressedTexture(
                gl,
                destination,
                alignedWidth,
                alignedHeight,
                COMPRESSED_RGBA_ASTC_4x4_KHR
              );
              break;
            case BASIS_FORMAT.cTFBC1:
            case BASIS_FORMAT.cTFBC3:
            case BASIS_FORMAT.cTFBC7:
              textureOrError = createCompressedTexture(
                gl,
                destination,
                alignedWidth,
                alignedHeight,
                DXT_FORMAT_MAP[format]
              );
              break;
            case BASIS_FORMAT.cTFETC1:
              textureOrError = createCompressedTexture(
                gl,
                destination,
                alignedWidth,
                alignedHeight,
                COMPRESSED_RGB_ETC1_WEBGL
              );
              break;
            case BASIS_FORMAT.cTFPVRTC1_4_RGB:
              textureOrError = createCompressedTexture(
                gl,
                destination,
                alignedWidth,
                alignedHeight,
                COMPRESSED_RGB_PVRTC_4BPPV1_IMG
              );
              break;
            case BASIS_FORMAT.cTFPVRTC1_4_RGBA:
              textureOrError = createCompressedTexture(
                gl,
                destination,
                alignedWidth,
                alignedHeight,
                COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
              );
              break;
            default: {
              canvas.width = width;
              canvas.height = height;
              displayWidth = width;
              displayHeight = height;
              const _565Texture = new Uint16Array(width * height);
              let pixel = 0;
              for (let y = 0; y < height; y++)
                for (let x = 0; x < width; x++, pixel++)
                  _565Texture[pixel] =
                    destination[2 * pixel] | (destination[2 * pixel + 1] << 8);
              textureOrError = createCompressedTexture(
                gl,
                _565Texture,
                width,
                height
              );
            }
          }

          if (textureOrError instanceof Error) {
            const error: ErrorMessageFromWorker = {
              status: "error",
              reason: textureOrError.message,
            };

            postMessage(error);
            return;
          }

          renderTexture(
            gl,
            textureOrError,
            displayWidth,
            displayHeight,
            attributeLocations,
            uniformLocations,
            quadBuffer
          );

          const blob = await canvas.convertToBlob();
          const blobURL = URL.createObjectURL(blob);

          const message: TranscodingMessageFromWorker = {
            name,
            blobURL,
            status: "success",
          };

          postMessage(message);
        }
        return;
      }
    }
  }
);

//#region WebGL Functions

function createCompressedTexture(
  gl: WebGLRenderingContext,
  destination: Uint8Array | Uint16Array,
  width: number,
  height: number,
  format?: number
): WebGLTexture | Error {
  const texture = gl.createTexture();
  if (texture === null) {
    return new Error("Could not create WebGL texture");
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);

  if (destination instanceof Uint8Array) {
    gl.compressedTexImage2D(
      gl.TEXTURE_2D,
      0,
      format as number,
      width,
      height,
      0,
      destination
    );
  } else {
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      width,
      height,
      0,
      gl.RGB,
      gl.UNSIGNED_SHORT_5_6_5,
      destination
    );
  }

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

function renderTexture(
  gl: WebGLRenderingContext,
  texture: WebGLTexture,
  width: number,
  height: number,
  attributeLocations: Record<string, number | null>,
  uniformLocations: Record<string, number | null>,
  quadBuffer: WebGLBuffer
): void {
  gl.clearColor(0, 0, 0, 1);
  gl.clearDepth(1);
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(uniformLocations.textureSampler, 0);

  gl.uniform4f(uniformLocations.control, 0, 0, 0, 0);

  const positionAttributeArray = attributeLocations.position;

  if (positionAttributeArray === null) {
    throw new Error("Positions attribute array not found");
  }

  gl.enableVertexAttribArray(positionAttributeArray);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.vertexAttribPointer(positionAttributeArray, 4, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: 35632 | 35633
): WebGLShader {
  const shader = gl.createShader(type);

  if (shader === null) {
    throw new Error("Could not create WebGL shader");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`[basis.ts] | ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}

//#endregion

//#region Texture Formats
const enum BASIS_FORMAT {
  cTFETC1,
  cTFETC2,
  cTFBC1,
  cTFBC3,
  cTFBC4,
  cTFBC5,
  cTFBC7,
  cTFPVRTC1_4_RGB,
  cTFPVRTC1_4_RGBA,
  cTFASTC_4x4,
  cTFATC_RGB,
  cTFATC_RGBA_INTERPOLATED_ALPHA,
  cTFRGBA32,
  cTFRGB565,
  cTFBGR565,
  cTFRGBA4444,
  cTFFXT1_RGB,
  cTFPVRTC2_4_RGB,
  cTFPVRTC2_4_RGBA,
  cTFETC2_EAC_R11,
  cTFETC2_EAC_RG11,
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
const COMPRESSED_RGBA_ASTC_4x4_KHR = 0x93b0;

// http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/

const COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83f0;
const COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83f3;

// https://www.khronos.org/registry/webgl/extensions/EXT_texture_compression_bptc/
const COMPRESSED_RGBA_BPTC_UNORM = 0x8e8c;

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/
const COMPRESSED_RGB_ETC1_WEBGL = 0x8d64;

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
const COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8c00;
const COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8c02;

const DXT_FORMAT_MAP: Record<
  BASIS_FORMAT.cTFBC1 | BASIS_FORMAT.cTFBC3 | BASIS_FORMAT.cTFBC7,
  number
> = {
  2: COMPRESSED_RGB_S3TC_DXT1_EXT,
  3: COMPRESSED_RGBA_S3TC_DXT5_EXT,
  6: COMPRESSED_RGBA_BPTC_UNORM,
};

//#endregion
