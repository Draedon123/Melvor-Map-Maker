(function(){"use strict";self.addEventListener("message",async e=>{const c=await(0,eval)(e.data.basisEncoderJS)();switch(e.data.mode){case"encode":{const{BasisEncoder:u,initializeBasis:r}=c;for(const{name:s,image:t}of e.data.data){const x=new Uint8Array(await t.arrayBuffer());r();const f=new Uint8Array(1024*1024*10),i=new u;i.setSliceSourceImage(0,x,0,0,!0),i.setComputeStats(!1),i.setPerceptual(!0),i.setMipSRGB(!0),i.setQualityLevel(255),i.setUASTC(!0),i.setMipGen(!1);const B=i.encode(f),U=new Uint8Array(f.buffer,0,B);if(i.delete(),B===0){postMessage({status:"error",reason:"Failed to convert image to .basis"});return}postMessage({status:"success",name:s,data:U})}return}case"transcode":{const{BasisFile:u,initializeBasis:r}=c,s=e.data.canvas,t=s.getContext("webgl");if(!(t!==null)){postMessage({status:"error",reason:"WebGL not supported"});return}const f=t.getExtension("WEBGL_compressed_texture_astc")!==null,i=t.getExtension("WEBGL_compressed_texture_etc1")!==null,B=t.getExtension("WEBGL_compressed_texture_s3tc")!==null,U=t.getExtension("WEBGL_compressed_texture_pvrtc")!==null||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc")!==null,D=t.getExtension("EXT_texture_compression_bptc")!==null,w={},L={},P=t.createBuffer();if(P===null)throw new Error("Could not create WebGL buffer");t.bindBuffer(t.ARRAY_BUFFER,P),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,1,-1,1,1,-1,1,0,0,1,1,1,0]),t.STATIC_DRAW);const q=C(t,`
          precision highp float;
          attribute vec4 position;
          varying vec2 varyingUV;
          void main(){
            gl_Position = vec4(position.xy, 0.0, 1.0);
            varyingUV = position.zw;
          }
        `,t.VERTEX_SHADER),Y=C(t,`
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
        `,t.FRAGMENT_SHADER),o=t.createProgram();if(o===null)throw new Error("Could not create WebGL program");t.attachShader(o,q),t.attachShader(o,Y),t.linkProgram(o),t.useProgram(o);const v=t.getAttribLocation(o,"position");t.bindAttribLocation(o,v,"position"),t.enableVertexAttribArray(v),t.enable(t.DEPTH_TEST),t.disable(t.CULL_FACE);const $=t.getProgramParameter(o,t.ACTIVE_UNIFORMS);for(let n=0;n<$;n++){const d=t.getActiveUniform(o,n);if(d===null)throw new Error(`Could not get uniform info for uniform ${n}`);const S=t.getUniformLocation(o,d.name);w[d.name]=S}const K=t.getProgramParameter(o,t.ACTIVE_ATTRIBUTES);for(let n=0;n<K;n++){const d=t.getActiveAttrib(o,n);if(d===null)throw new Error(`Could not get attribute for attribute ${n}`);const S=t.getAttribLocation(o,d.name);L[d.name]=S}for(const{name:n,file:d}of e.data.data){r();const S=new Uint8Array(await d.arrayBuffer()),a=new u(S),E=a.getImageWidth(0,0),_=a.getImageHeight(0,0),I=a.getHasAlpha();if(!E||!_){postMessage({status:"error",reason:"Invalid basis file"});return}const A=f?9:D?6:B?I?3:2:U?I?8:7:i?0:13;if((A===8||A===7)&&(E&E-1||_&_-1||E!==_)){postMessage({status:"error",reason:"PVRTC1 requires square power of 2 textures"});return}if(!a.startTranscoding()){a.close(),a.delete(),postMessage({status:"error",reason:"Transcoding failed"});return}const l=new Uint8Array(a.getImageTranscodedSizeInBytes(0,0,A));if(!a.transcodeImage(l,0,0,A,0,0)&&!a.startTranscoding()){a.close(),a.delete(),postMessage({status:"error",reason:"Transcoding failed"});return}a.close(),a.delete();const R=E+3&-4,m=_+3&-4;let y=R,G=m;s.width=R,s.height=m;let T;switch(A){case 9:T=b(t,l,R,m,X);break;case 2:case 3:case 6:T=b(t,l,R,m,z[A]);break;case 0:T=b(t,l,R,m,H);break;case 7:T=b(t,l,R,m,N);break;case 8:T=b(t,l,R,m,k);break;default:{s.width=E,s.height=_,y=E,G=_;const p=new Uint16Array(E*_);let h=0;for(let M=0;M<_;M++)for(let g=0;g<E;g++,h++)p[h]=l[2*h]|l[2*h+1]<<8;T=b(t,p,E,_)}}if(T instanceof Error){const p={status:"error",reason:T.message};postMessage(p);return}F(t,T,y,G,L,w,P);const j=await s.convertToBlob(),J=URL.createObjectURL(j);postMessage({name:n,blobURL:J,status:"success"})}return}}});function b(e,c,u,r,s){const t=e.createTexture();return t===null?new Error("Could not create WebGL texture"):(e.bindTexture(e.TEXTURE_2D,t),c instanceof Uint8Array?e.compressedTexImage2D(e.TEXTURE_2D,0,s,u,r,0,c):e.texImage2D(e.TEXTURE_2D,0,e.RGB,u,r,0,e.RGB,e.UNSIGNED_SHORT_5_6_5,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindTexture(e.TEXTURE_2D,null),t)}function F(e,c,u,r,s,t,x){e.clearColor(0,0,0,1),e.clearDepth(1),e.viewport(0,0,u,r),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT|e.STENCIL_BUFFER_BIT),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c),e.uniform1i(t.textureSampler,0),e.uniform4f(t.control,0,0,0,0);const f=s.position;if(f===null)throw new Error("Positions attribute array not found");e.enableVertexAttribArray(f),e.bindBuffer(e.ARRAY_BUFFER,x),e.vertexAttribPointer(f,4,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_STRIP,0,4)}function C(e,c,u){const r=e.createShader(u);if(r===null)throw new Error("Could not create WebGL shader");if(e.shaderSource(r,c),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw new Error(`[basis.ts] | ${e.getShaderInfoLog(r)}`);return r}const X=37808,O=33776,W=33779,V=36492,H=36196,N=35840,k=35842,z={2:O,3:W,6:V}})();