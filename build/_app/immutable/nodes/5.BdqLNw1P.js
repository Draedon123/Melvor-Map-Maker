import{a as le,c as He,u as Me,g as qe,b as Oe,d as M,f as he,h as we,r as ye,j as me,o as Ye,F as Xe}from"../chunks/scheduler.CWFRzsjZ.js";import{S as ue,i as fe,e as U,a as B,b as A,g as y,h as _,u as se,j,t as q,l as O,c as X,d as W,m as K,n as J,s as C,r as re,f as R,w as Ie,o as x,p as ee,k as S,E as ge,C as te,F as be,q as pe,v as _e,B as We,D as Se}from"../chunks/index.BXGTNUih.js";import"../chunks/database.Cun1NpHd.js";import{b as Ke}from"../chunks/paths.CZHKt0kD.js";import{s as ae,m as Te}from"../chunks/store.DiTc2wrj.js";import{r as ke,s as Fe,t as Ne,b as Je}from"../chunks/imageUtils.V0kzQxE2.js";import{D as Qe,P as $e}from"../chunks/ProgressBar.BK1PlImH.js";function xe(e,t,n){return Math.max(Math.min(e,n),t)}function et(e){let t,n;const s=e[5].default,i=He(s,e,e[4],null);return{c(){t=U("div"),i&&i.c(),this.h()},l(a){t=B(a,"DIV",{"data-form-stage":!0,class:!0});var r=A(t);i&&i.l(r),r.forEach(y),this.h()},h(){_(t,"data-form-stage",""),_(t,"class","svelte-1qbzzqz"),se(t,"hidden",e[1])},m(a,r){j(a,t,r),i&&i.m(t,null),e[6](t),n=!0},p(a,[r]){i&&i.p&&(!n||r&16)&&Me(i,s,a,a[4],n?Oe(s,a[4],r,null):qe(a[4]),null),(!n||r&2)&&se(t,"hidden",a[1])},i(a){n||(q(i,a),n=!0)},o(a){O(i,a),n=!1},d(a){a&&y(t),i&&i.d(a),e[6](null)}}}function tt(e,t,n){let s,{$$slots:i={},$$scope:a}=t,{stage:r}=t,{currentStage:l}=t,f;function g(d){M[d?"unshift":"push"](()=>{f=d,n(0,f)})}return e.$$set=d=>{"stage"in d&&n(2,r=d.stage),"currentStage"in d&&n(3,l=d.currentStage),"$$scope"in d&&n(4,a=d.$$scope)},e.$$.update=()=>{e.$$.dirty&12&&n(1,s=r!==l)},[f,s,r,l,a,i,g]}class Ue extends ue{constructor(t){super(),fe(this,t,tt,et,le,{stage:2,currentStage:3})}}function Ee(e){let t,n=`To preview your uploaded image, click the
          <img src="${Ke}/preview.png" alt="A document and a magnifying glass" style="height: 2em; width: 2em; display: inline; margin-left: 0.7ch;"/>
          icon on the left toolbar`;return{c(){t=U("p"),t.innerHTML=n,this.h()},l(s){t=B(s,"P",{class:!0,"data-svelte-h":!0}),re(t)!=="svelte-1ahcl0y"&&(t.innerHTML=n),this.h()},h(){_(t,"class","center svelte-82nuu6")},m(s,i){j(s,t,i)},d(s){s&&y(t)}}}function nt(e){let t,n="Drag and drop a .png image here, or click to upload a file.",s,i,a=e[1].mapImage!==null&&Ee();return{c(){t=U("p"),t.textContent=n,s=C(),a&&a.c(),i=Ie()},l(r){t=B(r,"P",{"data-svelte-h":!0}),re(t)!=="svelte-1rb6i9x"&&(t.textContent=n),s=R(r),a&&a.l(r),i=Ie()},m(r,l){j(r,t,l),j(r,s,l),a&&a.m(r,l),j(r,i,l)},p(r,l){r[1].mapImage!==null?a||(a=Ee(),a.c(),a.m(i.parentNode,i)):a&&(a.d(1),a=null)},d(r){r&&(y(t),y(s),y(i)),a&&a.d(r)}}}function st(e){let t,n="Step 1: Insert Your Map Image",s,i,a,r;return a=new Qe({props:{onFileUpload:e[6],validFileRegex:/.+\.png$/,mimeType:"image/png",$$slots:{default:[nt]},$$scope:{ctx:e}}}),{c(){t=U("h1"),t.textContent=n,s=C(),i=U("div"),X(a.$$.fragment),this.h()},l(l){t=B(l,"H1",{class:!0,"data-svelte-h":!0}),re(t)!=="svelte-g4n8qo"&&(t.textContent=n),s=R(l),i=B(l,"DIV",{class:!0});var f=A(i);W(a.$$.fragment,f),f.forEach(y),this.h()},h(){_(t,"class","svelte-82nuu6"),_(i,"class","file-upload-container svelte-82nuu6")},m(l,f){j(l,t,f),j(l,s,f),j(l,i,f),K(a,i,null),r=!0},p(l,f){const g={};f&258&&(g.$$scope={dirty:f,ctx:l}),a.$set(g)},i(l){r||(q(a.$$.fragment,l),r=!0)},o(l){O(a.$$.fragment,l),r=!1},d(l){l&&(y(t),y(s),y(i)),J(a)}}}function it(e){let t,n;return t=new Ue({props:{stage:1,currentStage:e[0],$$slots:{default:[st]},$$scope:{ctx:e}}}),{c(){X(t.$$.fragment)},l(s){W(t.$$.fragment,s)},m(s,i){K(t,s,i),n=!0},p(s,[i]){const a={};i&1&&(a.currentStage=s[0]),i&258&&(a.$$scope={dirty:i,ctx:s}),t.$set(a)},i(s){n||(q(t.$$.fragment,s),n=!0)},o(s){O(t.$$.fragment,s),n=!1},d(s){J(t,s)}}}const at="StageOne";function rt(e,t,n){let s;he(e,ae,o=>n(1,s=o));let{activeStage:i}=t,{canGoToNextStage:a}=t,{disableAdvanceStageButtons:r}=t;function l(){return f===null?"No uploaded image":!0}let f=null;function g(o){const T=new Blob([o]),p=URL.createObjectURL(T);n(4,r=!0);const c=new Image;c.onload=()=>{const D=c.width%8,h=c.height%8;ke(c,{type:"additive",x:D,y:h},"image").then(b=>{f=b,s.mapImage!==null&&URL.revokeObjectURL(s.mapImage.src),we(ae,s.mapImage=b,s),n(4,r=!1),n(3,a=l())}).catch(b=>{n(4,r=!1);const E=b instanceof Error?b.message:"Unspecified error";return b(`${at} | uploadMapImage`,E)})},c.src=p}const d=o=>{g(o[0])};return e.$$set=o=>{"activeStage"in o&&n(0,i=o.activeStage),"canGoToNextStage"in o&&n(3,a=o.canGoToNextStage),"disableAdvanceStageButtons"in o&&n(4,r=o.disableAdvanceStageButtons)},[i,s,g,a,r,l,d]}class ot extends ue{constructor(t){super(),fe(this,t,rt,it,le,{activeStage:0,canGoToNextStage:3,disableAdvanceStageButtons:4,isStageComplete:5})}get isStageComplete(){return this.$$.ctx[5]}}function lt(e){let t,n,s="Step 2: (Optional)",i,a,r,l,f,g,d,o,T,p,c,D;return{c(){t=U("div"),n=U("h1"),n.textContent=s,i=C(),a=U("label"),r=x(`Tile Width:
      `),l=U("input"),f=C(),g=U("br"),d=C(),o=U("label"),T=x(`Tile Height:
      `),p=U("input"),this.h()},l(h){t=B(h,"DIV",{class:!0});var b=A(t);n=B(b,"H1",{class:!0,"data-svelte-h":!0}),re(n)!=="svelte-szwyjl"&&(n.textContent=s),i=R(b),a=B(b,"LABEL",{for:!0,class:!0});var E=A(a);r=ee(E,`Tile Width:
      `),l=B(E,"INPUT",{id:!0,name:!0,type:!0,min:!0,max:!0,step:!0,class:!0}),E.forEach(y),f=R(b),g=B(b,"BR",{}),d=R(b),o=B(b,"LABEL",{for:!0,class:!0});var k=A(o);T=ee(k,`Tile Height:
      `),p=B(k,"INPUT",{id:!0,name:!0,type:!0,min:!0,max:!0,step:!0,class:!0}),k.forEach(y),b.forEach(y),this.h()},h(){_(n,"class","svelte-djn0sj"),_(l,"id","tileWidth"),_(l,"name","tileWidth"),_(l,"type","number"),_(l,"min","1"),_(l,"max","2000"),_(l,"step","1"),_(l,"class","svelte-djn0sj"),se(l,"invalid",typeof e[3]=="string"),_(a,"for","tileWidth"),_(a,"class","svelte-djn0sj"),_(p,"id","tileHeight"),_(p,"name","tileHeight"),_(p,"type","number"),_(p,"min","1"),_(p,"max","2000"),_(p,"step","1"),_(p,"class","svelte-djn0sj"),se(p,"invalid",typeof e[3]=="string"),_(o,"for","tileHeight"),_(o,"class","svelte-djn0sj"),_(t,"class","container svelte-djn0sj")},m(h,b){j(h,t,b),S(t,n),S(t,i),S(t,a),S(a,r),S(a,l),ge(l,e[1]),S(t,f),S(t,g),S(t,d),S(t,o),S(o,T),S(o,p),ge(p,e[2]),c||(D=[te(l,"input",e[7]),te(p,"input",e[8])],c=!0)},p(h,b){b&2&&be(l.value)!==h[1]&&ge(l,h[1]),b&8&&se(l,"invalid",typeof h[3]=="string"),b&4&&be(p.value)!==h[2]&&ge(p,h[2]),b&8&&se(p,"invalid",typeof h[3]=="string")},d(h){h&&y(t),c=!1,ye(D)}}}function ut(e){let t,n;return t=new Ue({props:{stage:2,currentStage:e[0],$$slots:{default:[lt]},$$scope:{ctx:e}}}),{c(){X(t.$$.fragment)},l(s){W(t.$$.fragment,s)},m(s,i){K(t,s,i),n=!0},p(s,[i]){const a={};i&1&&(a.currentStage=s[0]),i&2062&&(a.$$scope={dirty:i,ctx:s}),t.$set(a)},i(s){n||(q(t.$$.fragment,s),n=!0)},o(s){O(t.$$.fragment,s),n=!1},d(s){J(t,s)}}}function Le(e,t,n){if(t<1)return"Tile width must be greater than 1";if(n<1)return"Tile height must be greater than 1";if(!Number.isInteger(t))return"Tile width must be an integer";if(!Number.isInteger(n))return"Tile height must be an integer";if(t>2e3)return"Tile width must be less than 2000";if(n>2e3)return"Tile height must be less than 2000";if(e!==null){if(!Number.isInteger(e.width/t))return"Tile width does not produce an integer number of tiles";if(!Number.isInteger(e.height/n))return"Tile height does not produce an integer number of tiles"}return!0}function Ce(e){for(let t=1;t++;t<e){const n=e/t;if(Number.isInteger(n)&&n<2e3)return n}return 0}function ft(e,t,n){let s,i,a;he(e,Te,c=>n(6,i=c)),he(e,ae,c=>n(10,a=c));let{activeStage:r}=t,{canGoToNextStage:l}=t;function f(){return Le(i,g,d)}let g=1,d=1,o=null;Te.subscribe(c=>{o!==c&&(o=c,n(1,g=c===null?1:Ce(c.width)),n(2,d=c===null?1:Ce(c.height)))});function T(){g=be(this.value),n(1,g)}function p(){d=be(this.value),n(2,d)}return e.$$set=c=>{"activeStage"in c&&n(0,r=c.activeStage),"canGoToNextStage"in c&&n(4,l=c.canGoToNextStage)},e.$$.update=()=>{if(e.$$.dirty&66){const c=((i==null?void 0:i.width)??0)/g;Number.isInteger(c)&&we(ae,a.tilesX=c,a)}if(e.$$.dirty&68){const c=((i==null?void 0:i.height)??0)/d;Number.isInteger(c)&&we(ae,a.tilesY=c,a)}e.$$.dirty&70&&n(3,s=(()=>{const c=Le(i,g,d);return n(4,l=c),c})())},[r,g,d,s,l,f,i,T,p]}class ct extends ue{constructor(t){super(),fe(this,t,ft,ut,le,{activeStage:0,canGoToNextStage:4,isStageComplete:5})}get isStageComplete(){return this.$$.ctx[5]}}"stream"in Blob.prototype||Object.defineProperty(Blob.prototype,"stream",{value(){return new Response(this).body}}),"setBigUint64"in DataView.prototype||Object.defineProperty(DataView.prototype,"setBigUint64",{value(e,t,n){const s=Number(0xffffffffn&t),i=Number(t>>32n);this.setUint32(e+(n?0:4),s,n),this.setUint32(e+(n?4:0),i,n)}});var oe=e=>new DataView(new ArrayBuffer(e)),Y=e=>new Uint8Array(e.buffer||e),ie=e=>new TextEncoder().encode(String(e)),ne=e=>Math.min(4294967295,Number(e)),Re=e=>Math.min(65535,Number(e));function gt(e,t){if(t===void 0||t instanceof Date||(t=new Date(t)),e instanceof File)return{isFile:1,t:t||new Date(e.lastModified),i:e.stream()};if(e instanceof Response)return{isFile:1,t:t||new Date(e.headers.get("Last-Modified")||Date.now()),i:e.body};if(t===void 0)t=new Date;else if(isNaN(t))throw new Error("Invalid modification date.");if(e===void 0)return{isFile:0,t};if(typeof e=="string")return{isFile:1,t,i:ie(e)};if(e instanceof Blob)return{isFile:1,t,i:e.stream()};if(e instanceof Uint8Array||e instanceof ReadableStream)return{isFile:1,t,i:e};if(e instanceof ArrayBuffer||ArrayBuffer.isView(e))return{isFile:1,t,i:Y(e)};if(Symbol.asyncIterator in e)return{isFile:1,t,i:Ze(e[Symbol.asyncIterator]())};throw new TypeError("Unsupported input format.")}function Ze(e,t=e){return new ReadableStream({async pull(n){let s=0;for(;n.desiredSize>s;){const i=await e.next();if(!i.value){n.close();break}{const a=dt(i.value);n.enqueue(a),s+=a.byteLength}}},cancel(n){var s;(s=t.throw)==null||s.call(t,n)}})}function dt(e){return typeof e=="string"?ie(e):e instanceof Uint8Array?e:Y(e)}function Pe(e,t,n){let[s,i]=function(a){return a?a instanceof Uint8Array?[a,1]:ArrayBuffer.isView(a)||a instanceof ArrayBuffer?[Y(a),1]:[ie(a),0]:[void 0,0]}(t);if(e instanceof File)return{o:ve(s||ie(e.name)),u:BigInt(e.size),l:i};if(e instanceof Response){const a=e.headers.get("content-disposition"),r=a&&a.match(/;\s*filename\*?=["']?(.*?)["']?$/i),l=r&&r[1]||e.url&&new URL(e.url).pathname.split("/").findLast(Boolean),f=l&&decodeURIComponent(l),g=n||+e.headers.get("content-length");return{o:ve(s||ie(f)),u:BigInt(g),l:i}}return s=ve(s,e!==void 0||n!==void 0),typeof e=="string"?{o:s,u:BigInt(ie(e).length),l:i}:e instanceof Blob?{o:s,u:BigInt(e.size),l:i}:e instanceof ArrayBuffer||ArrayBuffer.isView(e)?{o:s,u:BigInt(e.byteLength),l:i}:{o:s,u:mt(e,n),l:i}}function mt(e,t){return t>-1?BigInt(t):e?void 0:0n}function ve(e,t=1){if(!e||e.every(n=>n===47))throw new Error("The file must have a name.");if(t)for(;e[e.length-1]===47;)e=e.subarray(0,-1);else e[e.length-1]!==47&&(e=new Uint8Array([...e,47]));return e}var je=new Uint32Array(256);for(let e=0;e<256;++e){let t=e;for(let n=0;n<8;++n)t=t>>>1^(1&t&&3988292384);je[e]=t}function ze(e,t=0){t^=-1;for(var n=0,s=e.length;n<s;n++)t=t>>>8^je[255&t^e[n]];return(-1^t)>>>0}function Ve(e,t,n=0){const s=e.getSeconds()>>1|e.getMinutes()<<5|e.getHours()<<11,i=e.getDate()|e.getMonth()+1<<5|e.getFullYear()-1980<<9;t.setUint16(n,s,1),t.setUint16(n+2,i,1)}function pt({o:e,l:t},n){return 8*(!t||(n??function(s){try{ht.decode(s)}catch{return 0}return 1}(e)))}var ht=new TextDecoder("utf8",{fatal:1});function bt(e,t=0){const n=oe(30);return n.setUint32(0,1347093252),n.setUint32(4,754976768|t),Ve(e.t,n,10),n.setUint16(26,e.o.length,1),Y(n)}async function*_t(e){let{i:t}=e;if("then"in t&&(t=await t),t instanceof Uint8Array)yield t,e.m=ze(t,0),e.u=BigInt(t.length);else{e.u=0n;const n=t.getReader();for(;;){const{value:s,done:i}=await n.read();if(i)break;e.m=ze(s,e.m),e.u+=BigInt(s.length),yield s}}}function St(e,t){const n=oe(16+(t?8:0));return n.setUint32(0,1347094280),n.setUint32(4,e.isFile?e.m:0,1),t?(n.setBigUint64(8,e.u,1),n.setBigUint64(16,e.u,1)):(n.setUint32(8,ne(e.u),1),n.setUint32(12,ne(e.u),1)),Y(n)}function vt(e,t,n=0,s=0){const i=oe(46);return i.setUint32(0,1347092738),i.setUint32(4,755182848),i.setUint16(8,2048|n),Ve(e.t,i,12),i.setUint32(16,e.isFile?e.m:0,1),i.setUint32(20,ne(e.u),1),i.setUint32(24,ne(e.u),1),i.setUint16(28,e.o.length,1),i.setUint16(30,s,1),i.setUint16(40,e.isFile?33204:16893,1),i.setUint32(42,ne(t),1),Y(i)}function wt(e,t,n){const s=oe(n);return s.setUint16(0,1,1),s.setUint16(2,n-4,1),16&n&&(s.setBigUint64(4,e.u,1),s.setBigUint64(12,e.u,1)),s.setBigUint64(n-8,t,1),Y(s)}function Ge(e){return e instanceof File||e instanceof Response?[[e],[e]]:[[e.input,e.name,e.size],[e.input,e.lastModified]]}var yt=e=>function(t){let n=BigInt(22),s=0n,i=0;for(const a of t){if(!a.o)throw new Error("Every file must have a non-empty name.");if(a.u===void 0)throw new Error(`Missing size for file "${new TextDecoder().decode(a.o)}".`);const r=a.u>=0xffffffffn,l=s>=0xffffffffn;s+=BigInt(46+a.o.length+(r&&8))+a.u,n+=BigInt(a.o.length+46+(12*l|28*r)),i||(i=r)}return(i||s>=0xffffffffn)&&(n+=BigInt(76)),n+s}(function*(t){for(const n of t)yield Pe(...Ge(n)[0])}(e));function de(e,t={}){const n={"Content-Type":"application/zip","Content-Disposition":"attachment"};return(typeof t.length=="bigint"||Number.isInteger(t.length))&&t.length>0&&(n["Content-Length"]=String(t.length)),t.metadata&&(n["Content-Length"]=String(yt(t.metadata))),new Response(Ut(e,t),{headers:n})}function Ut(e,t={}){const n=function(s){var a;const i=s[Symbol.iterator in s?Symbol.iterator:Symbol.asyncIterator]();return{async next(){const r=await i.next();if(r.done)return r;const[l,f]=Ge(r.value);return{done:0,value:Object.assign(gt(...f),Pe(...l))}},throw:(a=i.throw)==null?void 0:a.bind(i),[Symbol.asyncIterator](){return this}}}(e);return Ze(async function*(s,i){const a=[];let r=0n,l=0n,f=0;for await(const o of s){const T=pt(o,i.buffersAreUTF8);yield bt(o,T),yield new Uint8Array(o.o),o.isFile&&(yield*_t(o));const p=o.u>=0xffffffffn,c=12*(r>=0xffffffffn)|28*p;yield St(o,p),a.push(vt(o,r,T,c)),a.push(o.o),c&&a.push(wt(o,r,c)),p&&(r+=8n),l++,r+=BigInt(46+o.o.length)+o.u,f||(f=p)}let g=0n;for(const o of a)yield o,g+=BigInt(o.length);if(f||r>=0xffffffffn){const o=oe(76);o.setUint32(0,1347094022),o.setBigUint64(4,BigInt(44),1),o.setUint32(12,755182848),o.setBigUint64(24,l,1),o.setBigUint64(32,l,1),o.setBigUint64(40,g,1),o.setBigUint64(48,r,1),o.setUint32(56,1347094023),o.setBigUint64(64,r+g,1),o.setUint32(72,1,1),yield Y(o)}const d=oe(22);d.setUint32(0,1347093766),d.setUint16(8,Re(l),1),d.setUint16(10,Re(l),1),d.setUint32(12,ne(g),1),d.setUint32(16,ne(r),1),yield Y(d)}(n,t),n)}function De(e){let t,n;return{c(){t=U("span"),n=x(e[3]),this.h()},l(s){t=B(s,"SPAN",{class:!0});var i=A(t);n=ee(i,e[3]),i.forEach(y),this.h()},h(){_(t,"class","error svelte-2q8c1l")},m(s,i){j(s,t,i),S(t,n)},p(s,i){i&8&&_e(n,s[3])},d(s){s&&y(t)}}}function Bt(e){let t,n,s="Step 3: Convert and Download Files",i,a,r,l,f,g,d,o,T,p,c,D,h,b,E="Convert",k,F,V,v,Z,L,P,Q;function $(m){e[10](m)}let I={ariaLabel:"File Conversion Progress"};e[1]!==void 0&&(I.value=e[1]),p=new $e({props:I}),e[9](p),M.push(()=>pe(p,"value",$));let w=e[3]!==""&&De(e);return{c(){t=U("div"),n=U("h1"),n.textContent=s,i=C(),a=U("p"),r=x(e[6]),l=C(),f=U("br"),g=C(),d=x(e[4]),o=C(),T=U("div"),X(p.$$.fragment),D=C(),h=U("div"),b=U("button"),b.textContent=E,k=C(),F=U("button"),V=x("Download"),Z=C(),w&&w.c(),this.h()},l(m){t=B(m,"DIV",{class:!0});var u=A(t);n=B(u,"H1",{class:!0,"data-svelte-h":!0}),re(n)!=="svelte-1jv2u68"&&(n.textContent=s),i=R(u),a=B(u,"P",{class:!0});var N=A(a);r=ee(N,e[6]),l=R(N),f=B(N,"BR",{}),g=R(N),d=ee(N,e[4]),N.forEach(y),o=R(u),T=B(u,"DIV",{class:!0});var G=A(T);W(p.$$.fragment,G),G.forEach(y),D=R(u),h=B(u,"DIV",{});var z=A(h);b=B(z,"BUTTON",{class:!0,"data-svelte-h":!0}),re(b)!=="svelte-1xc109j"&&(b.textContent=E),k=R(z),F=B(z,"BUTTON",{class:!0});var H=A(F);V=ee(H,"Download"),H.forEach(y),z.forEach(y),Z=R(u),w&&w.l(u),u.forEach(y),this.h()},h(){_(n,"class","svelte-2q8c1l"),_(a,"class","progress-bar-status svelte-2q8c1l"),_(T,"class","progress-bar svelte-2q8c1l"),_(b,"class","svelte-2q8c1l"),F.disabled=v=e[5]==="",_(F,"class","svelte-2q8c1l"),_(t,"class","container svelte-2q8c1l")},m(m,u){j(m,t,u),S(t,n),S(t,i),S(t,a),S(a,r),S(a,l),S(a,f),S(a,g),S(a,d),S(t,o),S(t,T),K(p,T,null),S(t,D),S(t,h),S(h,b),S(h,k),S(h,F),S(F,V),S(t,Z),w&&w.m(t,null),L=!0,P||(Q=[te(b,"click",e[7]),te(F,"click",e[8])],P=!0)},p(m,u){(!L||u&64)&&_e(r,m[6]),(!L||u&16)&&_e(d,m[4]);const N={};!c&&u&2&&(c=!0,N.value=m[1],me(()=>c=!1)),p.$set(N),(!L||u&32&&v!==(v=m[5]===""))&&(F.disabled=v),m[3]!==""?w?w.p(m,u):(w=De(m),w.c(),w.m(t,null)):w&&(w.d(1),w=null)},i(m){L||(q(p.$$.fragment,m),L=!0)},o(m){O(p.$$.fragment,m),L=!1},d(m){m&&y(t),e[9](null),J(p),w&&w.d(),P=!1,ye(Q)}}}function It(e){let t,n;return t=new Ue({props:{currentStage:e[0],stage:3,$$slots:{default:[Bt]},$$scope:{ctx:e}}}),{c(){X(t.$$.fragment)},l(s){W(t.$$.fragment,s)},m(s,i){K(t,s,i),n=!0},p(s,[i]){const a={};i&1&&(a.currentStage=s[0]),i&8318&&(a.$$scope={dirty:i,ctx:s}),t.$set(a)},i(s){n||(q(t.$$.fragment,s),n=!0)},o(s){O(t.$$.fragment,s),n=!1},d(s){J(t,s)}}}function Tt(e,t,n){let s,i;he(e,ae,h=>n(11,i=h));let{activeStage:a}=t,r,l=0,f="",g="",d="";const o={RESIZE:.05,SPLIT_FULL_SIZE:.075,SPLIT_HALF_SIZE:.1,CONVERT_FULL_SIZE:.65,CONVERT_HALF_SIZE:.95,ZIP:1};async function T(){if(n(3,f=""),n(4,g=""),r.set(0),i.mapImage===null){n(3,f="No map image has been uploaded");return}n(4,g="Resizing map image to half-size");const h=await ke(i.mapImage,{type:"scale",x:.5,y:.5},"image");r.set(o.RESIZE),n(4,g=`Splitting full size map into tiles (0 / ${i.tilesX*i.tilesY})`);const b=await Fe(i.mapImage,i.tilesX,i.tilesY,(I,w,m)=>{n(4,g=`Splitting full size map into tiles (${w} / ${m})`),r.set(I*(o.SPLIT_FULL_SIZE-o.RESIZE)+o.RESIZE)});n(4,g=`Splitting half size map into tiles (0 / ${i.tilesX*i.tilesY})`);const E=await Fe(h,i.tilesX,i.tilesY,(I,w,m)=>{n(4,g=`Splitting half size map into tiles (${w} / ${m})`),r.set(I*(o.SPLIT_HALF_SIZE-o.SPLIT_FULL_SIZE)+o.SPLIT_FULL_SIZE)});n(4,g=`Converting full size tiles into .basis files (0 / ${b.length})`);const k=await Ne(b.map(I=>{const{x:w,y:m,image:u}=I;return{name:`tile_${w}_${m}@1x.basis`,image:u}}),2,(I,w,m)=>{n(4,g=`Converting full size tiles into .basis files (${w} / ${m})`),r.set(I*(o.CONVERT_FULL_SIZE-o.SPLIT_HALF_SIZE)+o.SPLIT_HALF_SIZE)});n(4,g=`Converting half size tiles into .basis files (0 / ${E.length})`);const F=await Ne(E.map(I=>{const{x:w,y:m,image:u}=I;return{name:`tile_${w}_${m}@0.5x.basis`,image:u}}),2,(I,w,m)=>{n(4,g=`Converting half size tiles into .basis files (${w} / ${m})`),r.set(I*(o.CONVERT_HALF_SIZE-o.CONVERT_FULL_SIZE)+o.CONVERT_FULL_SIZE)}),V=k.map(I=>new File([I.file],I.name)),v=F.map(I=>new File([I.file],I.name)),Z=(await Promise.all(b.map(async({x:I,y:w,image:m})=>({file:await Je(m),name:`tile_${I}_${w}@1x.png`})))).map(I=>new File([I.file],I.name));n(4,g="Zipping files");const[L,P,Q]=await Promise.all([de(V).blob(),de(v).blob(),de(Z).blob()]),$=await de([{name:"1xBasis.zip",input:L},{name:"0.5xBasis.zip",input:P},{name:"PNGs.zip",input:Q}]).blob();n(5,d=URL.createObjectURL($)),n(4,g="Done!"),r.set(o.ZIP)}function p(){const h=document.createElement("a");h.href=d,h.download="bgTiles.zip",h.click()}function c(h){M[h?"unshift":"push"](()=>{r=h,n(2,r)})}function D(h){l=h,n(1,l)}return e.$$set=h=>{"activeStage"in h&&n(0,a=h.activeStage)},e.$$.update=()=>{e.$$.dirty&2&&n(6,s=`${(l*100).toFixed(2)}%`)},[a,l,r,f,g,d,s,T,p,c,D]}class Ft extends ue{constructor(t){super(),fe(this,t,Tt,It,le,{activeStage:0})}}function Ae(e){let t;return{c(){t=x(e[6])},l(n){t=ee(n,e[6])},m(n,s){j(n,t,s)},p(n,s){s&64&&_e(t,n[6])},d(n){n&&y(t)}}}function Nt(e){let t,n,s,i,a,r,l,f,g,d,o,T,p,c,D,h,b,E,k,F,V,v,Z,L;function P(u){e[10](u)}function Q(u){e[11](u)}let $={activeStage:e[1]};e[6]!==void 0&&($.canGoToNextStage=e[6]),e[3]!==void 0&&($.disableAdvanceStageButtons=e[3]),i=new ot({props:$}),e[9](i),M.push(()=>pe(i,"canGoToNextStage",P)),M.push(()=>pe(i,"disableAdvanceStageButtons",Q));function I(u){e[13](u)}let w={activeStage:e[1]};e[6]!==void 0&&(w.canGoToNextStage=e[6]),f=new ct({props:w}),e[12](f),M.push(()=>pe(f,"canGoToNextStage",I)),o=new Ft({props:{activeStage:e[1]}});let m=typeof e[6]=="string"&&Ae(e);return{c(){t=C(),n=U("div"),s=U("form"),X(i.$$.fragment),l=C(),X(f.$$.fragment),d=C(),X(o.$$.fragment),T=C(),p=U("div"),c=U("div"),m&&m.c(),D=C(),h=U("div"),b=U("input"),k=C(),F=U("input"),this.h()},l(u){We("svelte-1u9xhe4",document.head).forEach(y),t=R(u),n=B(u,"DIV",{class:!0});var G=A(n);s=B(G,"FORM",{class:!0,name:!0,id:!0});var z=A(s);W(i.$$.fragment,z),l=R(z),W(f.$$.fragment,z),d=R(z),W(o.$$.fragment,z),T=R(z),p=B(z,"DIV",{class:!0});var H=A(p);c=B(H,"DIV",{class:!0});var Be=A(c);m&&m.l(Be),Be.forEach(y),D=R(H),h=B(H,"DIV",{class:!0});var ce=A(h);b=B(ce,"INPUT",{type:!0,"data-direction":!0,class:!0}),k=R(ce),F=B(ce,"INPUT",{type:!0,"data-direction":!0,class:!0}),ce.forEach(y),H.forEach(y),z.forEach(y),G.forEach(y),this.h()},h(){document.title="File Generator",_(c,"class","error svelte-sgctn5"),_(b,"type","submit"),_(b,"data-direction","back"),b.value="Back",b.disabled=E=e[3]||e[1]===1||typeof e[6]=="string"&&!0,_(b,"class","svelte-sgctn5"),_(F,"type","submit"),_(F,"data-direction","forward"),F.value="Next",F.disabled=V=e[3]||e[1]===e[2]||typeof e[6]=="string"&&!0,_(F,"class","svelte-sgctn5"),_(h,"class","submit-button-container svelte-sgctn5"),_(p,"class","submit svelte-sgctn5"),_(s,"class","scrolling-form"),_(s,"name","fileGeneratorForm"),_(s,"id","fileGeneratorForm"),_(n,"class","form-container svelte-sgctn5")},m(u,N){j(u,t,N),j(u,n,N),S(n,s),K(i,s,null),S(s,l),K(f,s,null),S(s,d),K(o,s,null),S(s,T),S(s,p),S(p,c),m&&m.m(c,null),S(p,D),S(p,h),S(h,b),S(h,k),S(h,F),e[16](s),v=!0,Z||(L=[te(b,"click",Se(e[14])),te(F,"click",Se(e[15])),te(s,"submit",Se(e[8]))],Z=!0)},p(u,[N]){const G={};N&2&&(G.activeStage=u[1]),!a&&N&64&&(a=!0,G.canGoToNextStage=u[6],me(()=>a=!1)),!r&&N&8&&(r=!0,G.disableAdvanceStageButtons=u[3],me(()=>r=!1)),i.$set(G);const z={};N&2&&(z.activeStage=u[1]),!g&&N&64&&(g=!0,z.canGoToNextStage=u[6],me(()=>g=!1)),f.$set(z);const H={};N&2&&(H.activeStage=u[1]),o.$set(H),typeof u[6]=="string"?m?m.p(u,N):(m=Ae(u),m.c(),m.m(c,null)):m&&(m.d(1),m=null),(!v||N&74&&E!==(E=u[3]||u[1]===1||typeof u[6]=="string"&&!0))&&(b.disabled=E),(!v||N&78&&V!==(V=u[3]||u[1]===u[2]||typeof u[6]=="string"&&!0))&&(F.disabled=V)},i(u){v||(q(i.$$.fragment,u),q(f.$$.fragment,u),q(o.$$.fragment,u),v=!0)},o(u){O(i.$$.fragment,u),O(f.$$.fragment,u),O(o.$$.fragment,u),v=!1},d(u){u&&(y(t),y(n)),e[9](null),J(i),e[12](null),J(f),J(o),m&&m.d(),e[16](null),Z=!1,ye(L)}}}function Et(e,t,n){var V;const s={};let i,a=1,r=1,l=!1,f,g,d=((V=s[a])==null?void 0:V.call(s))??!0;function o(v){var Z,L;n(6,d=((Z=s[a])==null?void 0:Z.call(s))??!0),typeof d!="string"&&(n(1,a=xe(a+(v==="back"?-1:1),1,r)),n(6,d=((L=s[a])==null?void 0:L.call(s))??!0))}Ye(()=>{var L;const v=[...i.children].filter(P=>P.getAttribute("data-form-stage")!==null);let Z=v.length;n(2,r=Z);for(let P=0;P<Z;P++)v[P].setAttribute("data-stage",P.toString());s[1]=f.isStageComplete,s[2]=g.isStageComplete,n(6,d=((L=s[a])==null?void 0:L.call(s))??!0)});function T(v){Xe.call(this,e,v)}function p(v){M[v?"unshift":"push"](()=>{f=v,n(4,f)})}function c(v){d=v,n(6,d)}function D(v){l=v,n(3,l)}function h(v){M[v?"unshift":"push"](()=>{g=v,n(5,g)})}function b(v){d=v,n(6,d)}const E=()=>{o("back")},k=()=>{o("forward")};function F(v){M[v?"unshift":"push"](()=>{i=v,n(0,i)})}return[i,a,r,l,f,g,d,o,T,p,c,D,h,b,E,k,F]}class Zt extends ue{constructor(t){super(),fe(this,t,Et,Nt,le,{})}}export{Zt as component};
