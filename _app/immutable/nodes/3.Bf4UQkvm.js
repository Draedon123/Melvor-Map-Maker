import{a as R,j as Z,o as ee,A as F,d as U,B as ne,r as ae,c as le,u as re,g as oe,b as ie}from"../chunks/scheduler.CEYuN9sw.js";import{S as O,i as z,c as L,d as N,m as X,t as j,l as H,n as k,B as ue,e as I,s as D,a as y,b as Y,q as S,f as E,g as T,h,C as q,j as B,k as _,o as G,p as W,x as pe,r as J}from"../chunks/index.C0VDjlZ-.js";import{b as K}from"../chunks/paths.8_7PtnmC.js";import{T as fe,a as Q}from"../chunks/ToolbarItem.DTg_APkh.js";import{s as P,S as me}from"../chunks/store.DixQPATg.js";import{a as ce,b as de}from"../chunks/imageUtils.Cr6w8qOV.js";import{D as te}from"../chunks/Dialog.Cj81w0u7.js";import{D as ge,P as he}from"../chunks/DragDropUpload.8gnmLnO_.js";function $e(r){let e,t=`Drag and drop your .basis files here (in 1 go), or click to upload a
        file.`,n,a,s;return{c(){e=I("p"),e.textContent=t,n=D(),a=I("span"),s=G(r[1]),this.h()},l(l){e=y(l,"P",{class:!0,"data-svelte-h":!0}),S(e)!=="svelte-1isbihn"&&(e.textContent=t),n=E(l),a=y(l,"SPAN",{class:!0});var p=Y(a);s=W(p,r[1]),p.forEach(T),this.h()},h(){h(e,"class","svelte-13jdnn1"),h(a,"class","error svelte-13jdnn1")},m(l,p){B(l,e,p),B(l,n,p),B(l,a,p),_(a,s)},p(l,p){p&2&&pe(s,l[1])},d(l){l&&(T(e),T(n),T(a))}}}function _e(r){let e,t,n="Upload Map Images",a,s,l="The map images must be in the format: tile_(x)_(y)@(1x OR 0.5x).basis",p,c,w="ie, tile_3_5@0.5x.basis",f,o,M,i,u,m,C;o=new ge({props:{mimeType:".basis",multiple:!0,onFileUpload:r[4],$$slots:{default:[$e]},$$scope:{ctx:r}}});function A(v){r[6](v)}let b={containerStyles:{"border-color":"red"}};return r[2]!==void 0&&(b.value=r[2]),u=new he({props:b}),U.push(()=>ue(u,"value",A)),r[7](u),{c(){e=I("div"),t=I("h1"),t.textContent=n,a=D(),s=I("p"),s.textContent=l,p=D(),c=I("p"),c.textContent=w,f=D(),L(o.$$.fragment),M=D(),i=I("div"),L(u.$$.fragment),this.h()},l(v){e=y(v,"DIV",{class:!0});var x=Y(e);t=y(x,"H1",{class:!0,"data-svelte-h":!0}),S(t)!=="svelte-d8o6tz"&&(t.textContent=n),a=E(x),s=y(x,"P",{class:!0,"data-svelte-h":!0}),S(s)!=="svelte-lya26t"&&(s.textContent=l),p=E(x),c=y(x,"P",{class:!0,"data-svelte-h":!0}),S(c)!=="svelte-1gtbz8v"&&(c.textContent=w),f=E(x),N(o.$$.fragment,x),M=E(x),i=y(x,"DIV",{class:!0});var d=Y(i);N(u.$$.fragment,d),d.forEach(T),x.forEach(T),this.h()},h(){h(t,"class","svelte-13jdnn1"),h(s,"class","svelte-13jdnn1"),h(c,"class","svelte-13jdnn1"),h(i,"class","progress-bar svelte-13jdnn1"),q(i,"hidden",r[2]===0),h(e,"class","dialog svelte-13jdnn1")},m(v,x){B(v,e,x),_(e,t),_(e,a),_(e,s),_(e,p),_(e,c),_(e,f),X(o,e,null),_(e,M),_(e,i),X(u,i,null),C=!0},p(v,x){const d={};x&1026&&(d.$$scope={dirty:x,ctx:v}),o.$set(d);const g={};!m&&x&4&&(m=!0,g.value=v[2],ne(()=>m=!1)),u.$set(g),(!C||x&4)&&q(i,"hidden",v[2]===0)},i(v){C||(j(o.$$.fragment,v),j(u.$$.fragment,v),C=!0)},o(v){H(o.$$.fragment,v),H(u.$$.fragment,v),C=!1},d(v){v&&T(e),k(o),r[7](null),k(u)}}}function ve(r){let e,t,n={$$slots:{default:[_e]},$$scope:{ctx:r}};return e=new te({props:n}),r[8](e),{c(){L(e.$$.fragment)},l(a){N(e.$$.fragment,a)},m(a,s){X(e,a,s),t=!0},p(a,[s]){const l={};s&1038&&(l.$$scope={dirty:s,ctx:a}),e.$set(l)},i(a){t||(j(e.$$.fragment,a),t=!0)},o(a){H(e.$$.fragment,a),t=!1},d(a){r[8](null),k(e,a)}}}const be=/^tile_\d+_\d+@(1|0.5)x\.basis$/;function xe(r,e,t){let n;Z(r,P,i=>t(9,n=i));const a={modal:null};let s,l="",p=0,c;async function w(i){var x;if(t(1,l=""),n.viewport===null){t(1,l="Error: App is not initialised. This shouldn't happen...");return}if(i.length===0)return;const u=(x=i.find(d=>!be.test(d.name)))==null?void 0:x.name;if(u!==void 0){t(1,l=`Invalid file name: ${u}`);return}const m=i.map(d=>{const g=d.name.slice(0,-7).split(/_|@/g),$=parseInt(g[1]),V=parseInt(g[2]),se=parseInt(g[3]);return{x:$,y:V,resolution:se}}),C=Math.max(...m.map(d=>d.x))+1,A=Math.max(...m.map(d=>d.y))+1;if(m.length!==C*A){const d=[];for(let g=0;g<C;g++)for(let $=0;$<A;$++)m.find(V=>V.x===g&&V.y===$)===void 0&&d.push({x:g,y:$});t(1,l=`Some tiles are missing. First, do you intend to have ${C}x${A} tiles? If so, then you are missing these tiles: ${d.map(g=>`(${g.x},${g.y})`).join(", ")}`);return}const b=await ce(i.map(d=>({file:d,name:d.name})),2,d=>{c.set(d)});F(P,n.mapDimensions={x:b.tileWidth*C,y:b.tileHeight*A},n);const v=b.tiles.map(d=>{const g=me.from(de(d.image));return g.x=d.x*b.tileWidth,g.y=d.y*b.tileHeight,g});n.viewport.children.forEach(d=>d.removeChildren().forEach(g=>g.destroy)),n.backgroundLayer.addChild(...v),n.hexGridLayer.populate(n.mapDimensions,n.viewport,n.hexesX,n.hexesY),F(P,n.viewport.worldWidth=C*n.mapDimensions.x,n),F(P,n.viewport.worldHeight=A*n.mapDimensions.y,n),n.viewport.centerViewport()}ee(()=>{t(5,a.modal=s,a)});function f(i){p=i,t(2,p)}function o(i){U[i?"unshift":"push"](()=>{c=i,t(3,c)})}function M(i){U[i?"unshift":"push"](()=>{s=i,t(0,s)})}return[s,l,p,c,w,a,f,o,M]}class Ce extends O{constructor(e){super(),z(this,e,xe,ve,R,{exports:5})}get exports(){return this.$$.ctx[5]}}function we(r){let e,t,n="Hex Count",a,s,l,p,c="X:",w,f,o,M,i,u,m,C="Y:",A,b,v,x,d;return{c(){e=I("div"),t=I("h1"),t.textContent=n,a=D(),s=I("br"),l=D(),p=I("label"),p.textContent=c,w=D(),f=I("input"),M=D(),i=I("br"),u=D(),m=I("label"),m.textContent=C,A=D(),b=I("input"),this.h()},l(g){e=y(g,"DIV",{class:!0});var $=Y(e);t=y($,"H1",{class:!0,"data-svelte-h":!0}),S(t)!=="svelte-c4bxn4"&&(t.textContent=n),a=E($),s=y($,"BR",{class:!0}),l=E($),p=y($,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),S(p)!=="svelte-vvw4xn"&&(p.textContent=c),w=E($),f=y($,"INPUT",{id:!0,name:!0,type:!0,min:!0,step:!0,class:!0}),M=E($),i=y($,"BR",{class:!0}),u=E($),m=y($,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),S(m)!=="svelte-tr29dr"&&(m.textContent=C),A=E($),b=y($,"INPUT",{id:!0,name:!0,type:!0,min:!0,step:!0,class:!0}),$.forEach(T),this.h()},h(){h(t,"class","svelte-m378fu"),h(s,"class","svelte-m378fu"),h(p,"for","hexesX"),h(p,"class","svelte-m378fu"),h(f,"id","hexesX"),h(f,"name","hexesX"),h(f,"type","number"),h(f,"min",1),h(f,"step",1),f.value=o=r[1].hexesX,h(f,"class","svelte-m378fu"),h(i,"class","svelte-m378fu"),h(m,"for","hexesY"),h(m,"class","svelte-m378fu"),h(b,"id","hexesY"),h(b,"name","hexesY"),h(b,"type","number"),h(b,"min",1),h(b,"step",1),b.value=v=r[1].hexesY,h(b,"class","svelte-m378fu"),h(e,"class","dialog svelte-m378fu")},m(g,$){B(g,e,$),_(e,t),_(e,a),_(e,s),_(e,l),_(e,p),_(e,w),_(e,f),_(e,M),_(e,i),_(e,u),_(e,m),_(e,A),_(e,b),x||(d=[J(f,"change",r[3]),J(b,"change",r[4])],x=!0)},p(g,$){$&2&&o!==(o=g[1].hexesX)&&f.value!==o&&(f.value=o),$&2&&v!==(v=g[1].hexesY)&&b.value!==v&&(b.value=v)},d(g){g&&T(e),x=!1,ae(d)}}}function Ie(r){let e,t,n={$$slots:{default:[we]},$$scope:{ctx:r}};return e=new te({props:n}),r[5](e),{c(){L(e.$$.fragment)},l(a){N(e.$$.fragment,a)},m(a,s){X(e,a,s),t=!0},p(a,[s]){const l={};s&130&&(l.$$scope={dirty:s,ctx:a}),e.$set(l)},i(a){t||(j(e.$$.fragment,a),t=!0)},o(a){H(e.$$.fragment,a),t=!1},d(a){r[5](null),k(e,a)}}}function ye(r,e,t){let n;Z(r,P,f=>t(1,n=f));const a={modal:null};let s;const l={x:n.hexesX,y:n.hexesY};P.subscribe(({hexesX:f,hexesY:o})=>{n.viewport===null||l.x===f&&l.y===o||n.hexGridLayer.populate(n.mapDimensions,n.viewport,f,o)}),ee(()=>{t(2,a.modal=s,a)});const p=f=>{const o=parseInt(f.currentTarget.value);F(P,n.hexesX=isNaN(o)?1:Math.max(Math.floor(o),1),n)},c=f=>{const o=parseInt(f.currentTarget.value);F(P,n.hexesY=isNaN(o)?1:Math.max(Math.floor(o),1),n)};function w(f){U[f?"unshift":"push"](()=>{s=f,t(0,s)})}return[s,n,a,p,c,w]}class De extends O{constructor(e){super(),z(this,e,ye,Ie,R,{exports:2})}get exports(){return this.$$.ctx[2]}}function Ee(r){let e;return{c(){e=G("Upload Map Images")},l(t){e=W(t,"Upload Map Images")},m(t,n){B(t,e,n)},d(t){t&&T(e)}}}function Te(r){let e;return{c(){e=G("Hexes")},l(t){e=W(t,"Hexes")},m(t,n){B(t,e,n)},d(t){t&&T(e)}}}function Me(r){let e,t,n,a;return e=new Q({props:{imageSRC:K+"/upload.png",imageAltText:"An upload icon",imageOnClick:r[3],$$slots:{default:[Ee]},$$scope:{ctx:r}}}),n=new Q({props:{imageSRC:K+"/hex_grid.png",imageAltText:"A honeycomb",imageOnClick:r[4],$$slots:{default:[Te]},$$scope:{ctx:r}}}),{c(){L(e.$$.fragment),t=D(),L(n.$$.fragment)},l(s){N(e.$$.fragment,s),t=E(s),N(n.$$.fragment,s)},m(s,l){X(e,s,l),B(s,t,l),X(n,s,l),a=!0},p(s,l){const p={};l&1&&(p.imageOnClick=s[3]),l&128&&(p.$$scope={dirty:l,ctx:s}),e.$set(p);const c={};l&2&&(c.imageOnClick=s[4]),l&128&&(c.$$scope={dirty:l,ctx:s}),n.$set(c)},i(s){a||(j(e.$$.fragment,s),j(n.$$.fragment,s),a=!0)},o(s){H(e.$$.fragment,s),H(n.$$.fragment,s),a=!1},d(s){s&&T(t),k(e,s),k(n,s)}}}function Ae(r){let e,t,n,a,s,l,p,c,w;t=new fe({props:{$$slots:{default:[Me]},$$scope:{ctx:r}}});let f={};a=new Ce({props:f}),r[5](a);let o={};l=new De({props:o}),r[6](l);const M=r[2].default,i=le(M,r,r[7],null);return{c(){e=I("div"),L(t.$$.fragment),n=D(),L(a.$$.fragment),s=D(),L(l.$$.fragment),p=D(),c=I("div"),i&&i.c(),this.h()},l(u){e=y(u,"DIV",{class:!0});var m=Y(e);N(t.$$.fragment,m),n=E(m),N(a.$$.fragment,m),s=E(m),N(l.$$.fragment,m),p=E(m),c=y(m,"DIV",{class:!0});var C=Y(c);i&&i.l(C),C.forEach(T),m.forEach(T),this.h()},h(){h(c,"class","main svelte-zhdu1g"),h(e,"class","container svelte-zhdu1g")},m(u,m){B(u,e,m),X(t,e,null),_(e,n),X(a,e,null),_(e,s),X(l,e,null),_(e,p),_(e,c),i&&i.m(c,null),w=!0},p(u,[m]){const C={};m&131&&(C.$$scope={dirty:m,ctx:u}),t.$set(C);const A={};a.$set(A);const b={};l.$set(b),i&&i.p&&(!w||m&128)&&re(i,M,u,u[7],w?ie(M,u[7],m,null):oe(u[7]),null)},i(u){w||(j(t.$$.fragment,u),j(a.$$.fragment,u),j(l.$$.fragment,u),j(i,u),w=!0)},o(u){H(t.$$.fragment,u),H(a.$$.fragment,u),H(l.$$.fragment,u),H(i,u),w=!1},d(u){u&&T(e),k(t),r[5](null),k(a),r[6](null),k(l),i&&i.d(u)}}}function je(r,e,t){let{$$slots:n={},$$scope:a}=e,s,l;const p=()=>{var o;(o=s.exports.modal)==null||o.toggle()},c=()=>{var o;(o=l.exports.modal)==null||o.toggle()};function w(o){U[o?"unshift":"push"](()=>{s=o,t(0,s)})}function f(o){U[o?"unshift":"push"](()=>{l=o,t(1,l)})}return r.$$set=o=>{"$$scope"in o&&t(7,a=o.$$scope)},[s,l,n,p,c,w,f,a]}class Ue extends O{constructor(e){super(),z(this,e,je,Ae,R,{})}}export{Ue as component};
