(function(){"use strict";self.addEventListener("message",async t=>{const r=await(0,eval)(t.data.basisEncoderJS)();switch(t.data.mode){case"encode":{const{BasisEncoder:n,initializeBasis:i}=r;for(const{name:o,image:c}of t.data.data){const u=new Uint8Array(await c.arrayBuffer());i();const s=new Uint8Array(1024*1024*10),e=new n;e.setSliceSourceImage(0,u,0,0,!0),e.setComputeStats(!1),e.setPerceptual(!0),e.setMipSRGB(!0),e.setQualityLevel(255),e.setUASTC(!0),e.setMipGen(!1);const a=e.encode(s),d=new Uint8Array(s.buffer,0,a);if(e.delete(),a===0){postMessage({status:"error",reason:"Failed to convert image to .basis"});return}postMessage({status:"success",name:o,data:d})}return}}})})();