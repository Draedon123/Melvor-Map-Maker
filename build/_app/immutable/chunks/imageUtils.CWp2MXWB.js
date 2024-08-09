import{b as C}from"./paths.CNms3DRf.js";function E(t,e){const o=[],a=Math.floor(t.length/e),s=t.length-a*e;for(let n=0;n<e;n++)o[n]=t.slice(n*a,n*a+a),n<s&&o[n].push(t.at(-(n+1)));return o}const R=""+new URL("../workers/basis-ClX4h8Ff.js",import.meta.url).href;async function P(t,e,o=()=>{}){const a=`${C}/basis_encoder.js`,s=await fetch(a);if(!s.ok)throw new Error(`[imageUtils | toBasis] | Could not fetch basis_encoder.js.
Fetched url: ${a}
Response Status: ${s.status}`);const n=await s.text(),c=await Promise.all(t.map(h=>new Promise(l=>{L(h.image).then(i=>{l({name:h.name,image:i})})})));return new Promise((h,l)=>{const i=[],r=Array.from({length:e}).map(()=>new Worker(R,{type:"classic"})),u=E(c,e);let w=0;for(let d=0;d<r.length;d++){const b=r[d],p=u[d];b.addEventListener("message",f=>{if(f.data.status==="error"){l(new Error(f.data.reason));return}if(w++,o(w/c.length,w,c.length),i.push({name:f.data.name,file:f.data.data}),w===c.length){h(i);for(const m of r)m.terminate()}});const v={mode:"encode",basisEncoderJS:n,data:p};b.postMessage(v)}})}async function y(t,e=2,o=()=>{}){const a=`${C}/basis_encoder.js`,s=await fetch(a);if(!s.ok)throw new Error(`[imageUtils | fromBasis] | Could not fetch basis_encoder.js.
Fetched url: ${a}
Response Status: ${s.status}`);const n=await s.text();return new Promise((c,h)=>{const l=Array.from({length:e}).map(()=>new Worker(R,{type:"classic"})),i=E(t,e),r={tileWidth:0,tileHeight:0,tiles:[]};let u=0;for(let w=0;w<e;w++){const d=l[w],b=new OffscreenCanvas(0,0),p=i[w];d.addEventListener("message",f=>{const m=f.data;if(m.status==="error"){h(new Error(m.reason));return}const g=new Image;g.onload=()=>{u++,r.tileWidth=g.width,r.tileHeight=g.height;const U=m.name.split(/_|@/g);if(r.tiles.push({x:parseInt(U[1]),y:parseInt(U[2]),image:g}),URL.revokeObjectURL(m.blobURL),o(u/t.length,u,t.length),u===t.length){for(const k of l)k.terminate();c(r)}},g.src=m.blobURL});const v={mode:"transcode",data:p,canvas:b,basisEncoderJS:n};d.postMessage(v,[b])}})}function j(t,e,o){return new Promise((a,s)=>{const n=document.createElement("canvas"),c=n.getContext("2d");if(c===null){s(new Error("[imageUtils | resize] | Could not get 2D Canvas Rendering Context"));return}const h=e.type==="scale"?t.width*e.x:e.type==="additive"?t.width+e.x:e.x,l=e.type==="scale"?t.height*e.y:e.type==="additive"?t.height+e.y:e.y;n.width=h,n.height=l,c.drawImage(t,0,0,n.width,n.height),n.toBlob(i=>{if(i===null){s(new Error("[imageUtils | resize] | Could not turn canvas into blob"));return}const r=URL.createObjectURL(i),u=new Image;u.onload=()=>{o==="image"&&a(t)},u.src=r,o==="url"&&a(r)})})}function L(t){return new Promise((e,o)=>{x(t).toBlob(s=>{if(s===null){o(new Error("[imageUtils | toBlob] | Could not turn canvas into blob"));return}e(s)})})}async function S(t,e,o,a=()=>{}){const s=[],n=t.width/e,c=t.height/o,h=e*o;let l=0;for(let i=0;i<e;i++)for(let r=0;r<o;r++)s.push(new Promise((u,w)=>{const d=document.createElement("canvas"),b=d.getContext("2d"),p=n*i,v=c*r;if(d.width=n,d.height=c,b===null)throw new Error("[imageUtils | split] | Could not get 2d canvas rendering context");b.drawImage(t,p,v,n,c,0,0,n,c),d.toBlob(f=>{if(f===null){w(new Error("[imageUtils | split] | Could not turn canvas into blob"));return}const m=URL.createObjectURL(f),g=new Image;g.onload=()=>{l++,a(l/h,l,h),u({x:i,y:r,image:g})},g.src=m})}));return await Promise.all(s)}async function $(t){return await(await L(t)).arrayBuffer()}function A(t){return new Promise(e=>{const o=new Blob([t]),a=URL.createObjectURL(o),s=new Image;s.onload=()=>{e(s)},s.src=a})}function x(t,e){const o=e?e.canvas:document.createElement("canvas"),a=e||o.getContext("2d");if(a===null)throw new Error("[imageUtils | toCanvas] | Could not get 2d canvas rendering context");return o.width=t.width,o.height=t.height,a.drawImage(t,0,0,t.width,t.height),o}export{A as a,$ as b,P as c,L as d,y as f,j as r,S as s,x as t};
