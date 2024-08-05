import type {
  EncodingMessageToWorker,
  EncodingMessageFromWorker,
  TranscodingMessageToWorker,
  TranscodingMessageFromWorker,
  ErrorMessageFromWorker,
} from "../workers/basisTypes";
import { base } from "$app/paths";
import type { PointData } from "$lib/melvor/schema";
import chunkArray from "./chunkArray";
import workerCodeURL from "../workers/basis?worker&url";

async function toBasis(
  images: { image: HTMLImageElement; name: string }[],
  workerCount: number,
  onConvert: (
    progress: number,
    convertedCount: number,
    totalFiles: number
  ) => void = () => {}
): Promise<{ file: Uint8Array; name: string }[]> {
  const url = `${base}/basis_encoder.js`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `[imageToBasis] | Could not fetch basis_encoder.js.\nFetched url: ${url}\nResponse Status: ${response.status}`
    );
  }
  const basisEncoderJS = await response.text();
  const filesToConvert = await Promise.all(
    images.map(
      (data) =>
        new Promise<{ image: Blob; name: string }>((resolve) => {
          toBlob(data.image).then((blob) => {
            resolve({
              name: data.name,
              image: blob,
            });
          });
        })
    )
  );

  return new Promise((resolve, reject) => {
    const basisFiles: { file: Uint8Array; name: string }[] = [];
    const workers = Array.from<number>({ length: workerCount }).map(
      () =>
        new Worker(workerCodeURL, {
          type: import.meta.env.DEV ? "module" : "classic",
        })
    );

    const chunks = chunkArray(filesToConvert, workerCount);

    let convertedCount = 0;

    for (let i = 0; i < workers.length; i++) {
      const worker = workers[i];
      const chunk = chunks[i];

      worker.addEventListener(
        "message",
        (
          message: MessageEvent<
            EncodingMessageFromWorker | ErrorMessageFromWorker
          >
        ) => {
          if (message.data.status === "error") {
            reject(new Error(message.data.reason));
            return;
          }

          convertedCount++;
          onConvert(
            convertedCount / filesToConvert.length,
            convertedCount,
            filesToConvert.length
          );

          basisFiles.push({
            name: message.data.name,
            file: message.data.data,
          });

          if (convertedCount === filesToConvert.length) {
            resolve(basisFiles);

            for (const worker of workers) {
              worker.terminate();
            }
          }
        }
      );

      const data: EncodingMessageToWorker = {
        mode: "encode",
        basisEncoderJS,
        data: chunk,
      };

      worker.postMessage(data);
    }
  });
}

async function fromBasis(
  files: {
    file: File | Blob;
    name: string;
  }[],
  workerCount: number = 2,
  onConvert: (
    progress: number,
    convertedCount: number,
    totalFiles: number
  ) => void = () => {}
): Promise<TranscodedFileArray> {
  const basisEncoderJSPath = `${base}/basis_encoder.js`;
  const response = await fetch(basisEncoderJSPath);

  if (!response.ok) {
    throw new Error(
      `[basisToImage] | Could not fetch basis_encoder.js.\nFetched url: ${basisEncoderJSPath}\nResponse Status: ${response.status}`
    );
  }

  const basisEncoderJS = await response.text();

  return new Promise<TranscodedFileArray>((resolve, reject) => {
    const workers = Array.from<number>({ length: workerCount }).map(
      () =>
        new Worker(workerCodeURL, {
          type: import.meta.env.DEV ? "module" : "classic",
        })
    );

    const chunks = chunkArray(files, workerCount);
    const tiles: TranscodedFileArray = {
      tileWidth: 0,
      tileHeight: 0,
      tiles: [],
    };

    let filesTranscoded = 0;
    for (let i = 0; i < workerCount; i++) {
      const worker = workers[i];
      // dimensions are set inside worker script
      const canvas = new OffscreenCanvas(0, 0);
      const chunk = chunks[i];

      worker.addEventListener(
        "message",
        (
          message: MessageEvent<
            TranscodingMessageFromWorker | ErrorMessageFromWorker
          >
        ) => {
          const data = message.data;

          if (data.status === "error") {
            reject(new Error(data.reason));
            return;
          }

          const image = new Image();
          image.onload = () => {
            filesTranscoded++;

            tiles.tileWidth = image.width;
            tiles.tileHeight = image.height;

            // tile_0_0@0.5x.basis -> [tile, 0, 0, 0.5x.basis]
            const splitFileName = data.name.split(/_|@/g);

            tiles.tiles.push({
              x: parseInt(splitFileName[1]),
              y: parseInt(splitFileName[2]),
              image,
            });

            URL.revokeObjectURL(data.blobURL);

            onConvert(
              filesTranscoded / files.length,
              filesTranscoded,
              files.length
            );

            if (filesTranscoded === files.length) {
              for (const worker of workers) worker.terminate();
              resolve(tiles);
            }
          };
          image.src = data.blobURL;
        }
      );

      const data: TranscodingMessageToWorker = {
        mode: "transcode",
        data: chunk,
        canvas,
        basisEncoderJS,
      };
      worker.postMessage(data, [canvas]);
    }
  });
}

function resize(
  image: HTMLImageElement,
  resizeBy: ResizeBy,
  returnValue: "image"
): Promise<HTMLImageElement>;
function resize(
  image: HTMLImageElement,
  resizeBy: ResizeBy,
  returnValue: "url"
): Promise<string>;
function resize(
  image: HTMLImageElement,
  resizeBy: ResizeBy,
  returnValue: "image" | "url"
): Promise<HTMLImageElement | string> {
  return new Promise<HTMLImageElement | string>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      reject(
        new Error("[resizeImage] | Could not get 2D Canvas Rendering Context")
      );
      return;
    }

    const width =
      resizeBy.type === "scale"
        ? image.width * resizeBy.x
        : resizeBy.type === "additive"
          ? image.width + resizeBy.x
          : resizeBy.x;
    const height =
      resizeBy.type === "scale"
        ? image.height * resizeBy.y
        : resizeBy.type === "additive"
          ? image.height + resizeBy.y
          : resizeBy.y;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject(new Error("[imageResize] | Could not turn canvas into blob"));
        return;
      }

      const url = URL.createObjectURL(blob);
      const resizedImage = new Image();

      resizedImage.onload = () => {
        if (returnValue === "image") {
          resolve(image);
        }
      };

      resizedImage.src = url;

      if (returnValue === "url") {
        resolve(url);
      }
    });
  });
}

function toBlob(image: HTMLImageElement): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const canvas = toCanvas(image);

    canvas.toBlob((blob) => {
      if (blob === null) {
        reject(new Error("[imageToBlob] | Could not turn canvas into blob"));
        return;
      }

      resolve(blob);
    });
  });
}

async function split(
  image: HTMLImageElement,
  tilesX: number,
  tilesY: number,
  onProgress: (
    progress: number,
    convertedCount: number,
    totalImages: number
  ) => void = () => {}
): Promise<{ x: number; y: number; image: HTMLImageElement }[]> {
  const promises: Promise<{
    x: number;
    y: number;
    image: HTMLImageElement;
  }>[] = [];

  const tileWidth = image.width / tilesX;
  const tileHeight = image.height / tilesY;

  const tileCount = tilesX * tilesY;
  let splitCount = 0;

  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      promises.push(
        new Promise((resolve, reject) => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const sourceX = tileWidth * x;
          const sourceY = tileHeight * y;

          canvas.width = tileWidth;
          canvas.height = tileHeight;

          if (ctx === null) {
            throw new Error(
              "[splitImage] | Could not get 2d canvas rendering context"
            );
          }

          ctx.drawImage(
            image,
            sourceX,
            sourceY,
            tileWidth,
            tileHeight,
            0,
            0,
            tileWidth,
            tileHeight
          );

          canvas.toBlob((blob) => {
            if (blob === null) {
              reject(
                new Error("[splitImage] | Could not turn canvas into blob")
              );
              return;
            }

            const blobURL = URL.createObjectURL(blob);
            const image = new Image();
            image.onload = () => {
              splitCount++;
              onProgress(splitCount / tileCount, splitCount, tileCount);
              resolve({
                x,
                y,
                image,
              });
            };
            image.src = blobURL;
          });
        })
      );
    }
  }

  return await Promise.all(promises);
}

async function toArrayBuffer(image: HTMLImageElement): Promise<ArrayBuffer> {
  return await (await toBlob(image)).arrayBuffer();
}

function fromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const blob = new Blob([arrayBuffer]);
    const blobURL = URL.createObjectURL(blob);

    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.src = blobURL;
  });
}

function toCanvas(
  image: HTMLImageElement,
  _ctx?: CanvasRenderingContext2D
): HTMLCanvasElement {
  const canvas = _ctx ? _ctx.canvas : document.createElement("canvas");
  const ctx = _ctx ? _ctx : canvas.getContext("2d");

  if (ctx === null) {
    throw new Error(
      `[ImageUtils | toCanvas] | Could not get 2d canvas rendering context`
    );
  }

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0, image.width, image.height);

  return canvas;
}

type ResizeBy = Scale | Additive | Absolute;

type Scale = {
  type: "scale";
} & PointData;

type Additive = {
  type: "additive";
} & PointData;

type Absolute = {
  type: "to";
} & PointData;

type TranscodedFileArray = {
  tileWidth: number;
  tileHeight: number;
  tiles: ({
    image: HTMLImageElement;
  } & PointData)[];
};

export {
  toBasis,
  fromBasis,
  resize,
  toBlob,
  toCanvas,
  split,
  toArrayBuffer,
  fromArrayBuffer,
};
