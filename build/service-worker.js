const s=location.pathname.split("/").slice(0,-1).join("/"),o=[s+"/_app/immutable/entry/app.CR6MtJd1.js",s+"/_app/immutable/nodes/0.BhJr6Cu7.js",s+"/_app/immutable/assets/0.ijKjmUcR.css",s+"/_app/immutable/nodes/1.DXF9jAi4.js",s+"/_app/immutable/assets/1.BOJv3Zgp.css",s+"/_app/immutable/nodes/2.C4sK9WoS.js",s+"/_app/immutable/assets/2.BEIqfxzw.css",s+"/_app/immutable/nodes/3.W_wb1jqv.js",s+"/_app/immutable/assets/3.DYgBjl4c.css",s+"/_app/immutable/nodes/4.BuiwLOrA.js",s+"/_app/immutable/assets/4.D2caSeFB.css",s+"/_app/immutable/nodes/5.DtlC0nS1.js",s+"/_app/immutable/assets/5.tZ_RBxqR.css",s+"/_app/immutable/nodes/6.DHffaYIu.js",s+"/_app/immutable/assets/6.DcEQCcId.css",s+"/_app/immutable/chunks/CanvasPool.CY6IRNQB.js",s+"/_app/immutable/assets/Dialog.DosqUkdY.css",s+"/_app/immutable/chunks/Dialog.DkzHurqP.js",s+"/_app/immutable/assets/DragDropUpload.CvU43ob3.css",s+"/_app/immutable/chunks/DragDropUpload.C8zCghRk.js",s+"/_app/immutable/chunks/Project.DUNrzmGD.js",s+"/_app/immutable/chunks/SharedSystems.B39Fb78I.js",s+"/_app/immutable/assets/ToolbarItem.Bm-vTiVV.css",s+"/_app/immutable/chunks/ToolbarItem.Bxe9aOjZ.js",s+"/_app/immutable/chunks/_commonjsHelpers.Cpj98o6Y.js",s+"/_app/immutable/chunks/colorToUniform.YjvcVpDW.js",s+"/_app/immutable/chunks/database.DwORp3Qu.js",s+"/_app/immutable/chunks/entry.L1g8x0Z3.js",s+"/_app/immutable/chunks/getBatchSamplersUniformGroup.CSGVMhtR.js",s+"/_app/immutable/chunks/imageUtils.DqVI_vGs.js",s+"/_app/immutable/chunks/index.CbAtjXu_.js",s+"/_app/immutable/chunks/index.CzCyl25Q.js",s+"/_app/immutable/chunks/log.biInBdqM.js",s+"/_app/immutable/chunks/paths.Dezj3jUE.js",s+"/_app/immutable/chunks/preload-helper.D6kgxu3v.js",s+"/_app/immutable/chunks/scheduler.Coouxh8L.js",s+"/_app/immutable/chunks/store.BxXiGBvV.js",s+"/_app/immutable/chunks/store.DZb1jBln.js",s+"/_app/immutable/entry/start.D_11aWOU.js",s+"/_app/immutable/chunks/browserAll._qCdB2sj.js",s+"/_app/immutable/chunks/webworkerAll.D0tzLDfp.js",s+"/_app/immutable/chunks/WebGLRenderer.CJu6IDcs.js",s+"/_app/immutable/chunks/WebGPURenderer.96Afw3SK.js"],c=[s+"/.nojekyll",s+"/404.html",s+"/apple-touch-icon-180x180.png",s+"/basis_encoder.js",s+"/basis_encoder.wasm",s+"/black.png",s+"/favicon.ico",s+"/favicon.svg",s+"/File Generator.html",s+"/hex_grid.png",s+"/manifest.webmanifest",s+"/Map Builder.html",s+"/maskable-icon-512x512.png",s+"/no_image.png",s+"/preview.png",s+"/pwa-192x192.png",s+"/pwa-512x512.png",s+"/pwa-64x64.png",s+"/screenshot_1.png",s+"/upload.png"],l="1725684159704",r=`cache_${l}`,u=[".nojekyll"].map((s=>`/Melvor-Map-Maker/${s}`)),i=[...o,...c].filter((s=>!u.includes(s)));self.addEventListener("install",(s=>{s.waitUntil((async()=>{const s=await caches.open(r);for(const e of i)try{await s.add(e)}catch(s){const a=s instanceof Error?s.message:"Unspecified error";console.error(`Error while adding asset to cache.\nAsset: ${e}\nError message: ${a}`)}})())})),self.addEventListener("activate",(s=>{s.waitUntil((async()=>{const s=await caches.keys();for(const e of s)e!==r&&await caches.delete(e)})())})),self.addEventListener("fetch",(s=>{"GET"!==s.request.method||s.request.url.startsWith("chrome-extension://")||s.respondWith((async()=>{const e=new URL(s.request.url),a=await caches.open(r);if(i.includes(e.pathname)){const s=await a.match(e.pathname);if(void 0!==s)return s}try{const t=await fetch(e);if(!(t instanceof Response))throw new Error("Invalid response from fetch");return 200===t.status&&a.put(s.request,t.clone()),t}catch(t){const p=await a.match(s.request);if(void 0!==p)return p;const n=t instanceof Error?t.message:"Unspecified error";throw new Error(`Failed to fetch url ${e.pathname}.\nError message: ${n}`)}})())}));