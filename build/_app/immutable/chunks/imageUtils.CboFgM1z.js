import{b as I,az as P,j as S,R as j,u as N,h as b,f as O,ai as R,aA as F,aB as T,aC as B}from"./utils.BRJKUTqf.js";import{b as $}from"./store.BTSVGJLy.js";import{b as C}from"./paths.BXsdQ0-J.js";function G(t,e,...s){var o=t,n=j,r;I(()=>{n!==(n=e())&&(r&&(N(r),r=null),r=S(()=>n(o,...s)))},P),b&&(o=O)}function q(t){if(b){var e=!1,s=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var o=t.value;U(t,"value",null),t.value=o}if(t.hasAttribute("checked")){var n=t.checked;U(t,"checked",null),t.checked=n}}};t.__on_r=s,B(s),$()}}function K(t,e){var s=t.__attributes??(t.__attributes={});s.value===(s.value=e??void 0)||t.value===e&&(e!==0||t.nodeName!=="PROGRESS")||(t.value=e)}function U(t,e,s,o){var n=t.__attributes??(t.__attributes={});b&&(n[e]=t.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&t.nodeName==="LINK")||n[e]!==(n[e]=s)&&(e==="style"&&"__styles"in t&&(t.__styles={}),e==="loading"&&(t[F]=s),s==null?t.removeAttribute(e):typeof s!="string"&&M(t).includes(e)?t[e]=s:t.setAttribute(e,s))}var k=new Map;function M(t){var e=k.get(t.nodeName);if(e)return e;k.set(t.nodeName,e=[]);for(var s,o=R(t),n=Element.prototype;n!==o;){s=T(o);for(var r in s)s[r].set&&e.push(r);o=R(o)}return e}function L(t,e){const s=[],o=Math.floor(t.length/e),n=t.length-o*e;for(let r=0;r<e;r++)s[r]=t.slice(r*o,r*o+o),r<n&&s[r].push(t.at(-(r+1)));return s}const x=""+new URL("../workers/basis-ClX4h8Ff.js",import.meta.url).href;async function V(t,e,s=()=>{}){const o=`${C}/basis_encoder.js`,n=await fetch(o);if(!n.ok)throw new Error(`[imageUtils | toBasis] | Could not fetch basis_encoder.js.
Fetched url: ${o}
Response Status: ${n.status}`);const r=await n.text(),i=await Promise.all(t.map(l=>new Promise(d=>{y(l.image).then(c=>{d({name:l.name,image:c})})})));return new Promise((l,d)=>{const c=[],a=Array.from({length:e}).map(()=>new Worker(x,{type:"classic"})),h=L(i,e);let u=0;for(let f=0;f<a.length;f++){const v=a[f],_=h[f];v.addEventListener("message",w=>{if(w.data.status==="error"){d(new Error(w.data.reason));return}if(u++,s(u/i.length,u,i.length),c.push({name:w.data.name,file:w.data.data}),u===i.length){l(c);for(const g of a)g.terminate()}});const m={mode:"encode",basisEncoderJS:r,data:_};v.postMessage(m)}})}async function Q(t,e=2,s=()=>{}){const o=`${C}/basis_encoder.js`,n=await fetch(o);if(!n.ok)throw new Error(`[imageUtils | fromBasis] | Could not fetch basis_encoder.js.
Fetched url: ${o}
Response Status: ${n.status}`);const r=await n.text();return new Promise((i,l)=>{const d=Array.from({length:e}).map(()=>new Worker(x,{type:"classic"})),c=L(t,e),a={tileWidth:0,tileHeight:0,tiles:[]};let h=0;for(let u=0;u<e;u++){const f=d[u],v=new OffscreenCanvas(0,0),_=c[u];f.addEventListener("message",w=>{const g=w.data;if(g.status==="error"){l(new Error(g.reason));return}const p=new Image;p.onload=()=>{h++,a.tileWidth=p.width,a.tileHeight=p.height;const E=g.name.split(/_|@/g);if(a.tiles.push({x:parseInt(E[1]),y:parseInt(E[2]),image:p}),URL.revokeObjectURL(g.blobURL),s(h/t.length,h,t.length),h===t.length){for(const A of d)A.terminate();i(a)}},p.src=g.blobURL});const m={mode:"transcode",data:_,canvas:v,basisEncoderJS:r};f.postMessage(m,[v])}})}function X(t,e,s){return new Promise((o,n)=>{const r=document.createElement("canvas"),i=r.getContext("2d");if(i===null){n(new Error("[imageUtils | resize] | Could not get 2D Canvas Rendering Context"));return}const l=e.type==="scale"?t.width*e.x:e.type==="additive"?t.width+e.x:e.x,d=e.type==="scale"?t.height*e.y:e.type==="additive"?t.height+e.y:e.y;if(t.width===l&&t.height===d){o(t);return}r.width=l,r.height=d,i.drawImage(t,0,0,r.width,r.height),r.toBlob(c=>{if(c===null){n(new Error("[imageUtils | resize] | Could not turn canvas into blob"));return}const a=URL.createObjectURL(c),h=new Image;h.onload=()=>{o(t)},h.src=a})})}function y(t){return new Promise((e,s)=>{W(t).toBlob(n=>{if(n===null){s(new Error("[imageUtils | toBlob] | Could not turn canvas into blob"));return}e(n)})})}async function Y(t,e,s,o=()=>{}){const n=[],r=t.width/e,i=t.height/s,l=e*s;let d=0;for(let c=0;c<e;c++)for(let a=0;a<s;a++)n.push(new Promise((h,u)=>{const f=document.createElement("canvas"),v=f.getContext("2d"),_=r*c,m=i*a;if(f.width=r,f.height=i,v===null)throw new Error("[imageUtils | split] | Could not get 2d canvas rendering context");v.drawImage(t,_,m,r,i,0,0,r,i),f.toBlob(w=>{if(w===null){u(new Error("[imageUtils | split] | Could not turn canvas into blob"));return}const g=URL.createObjectURL(w),p=new Image;p.onload=()=>{d++,o(d/l,d,l),h({x:c,y:a,image:p})},p.src=g})}));return await Promise.all(n)}async function Z(t){return await(await y(t)).arrayBuffer()}function z(t){return new Promise(e=>{const s=new Blob([t]),o=URL.createObjectURL(s),n=new Image;n.onload=()=>{e(n)},n.src=o})}function W(t,e){const s=document.createElement("canvas"),o=s.getContext("2d");if(o===null)throw new Error("[imageUtils | toCanvas] | Could not get 2d canvas rendering context");return s.width=t.width,s.height=t.height,o.drawImage(t,0,0,t.width,t.height),s}export{U as a,Z as b,q as c,Y as d,V as e,z as f,K as g,Q as h,W as i,X as r,G as s,y as t};