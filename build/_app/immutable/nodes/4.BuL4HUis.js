import{B as ce,C as ie,x as L,m as he,r as ue,a as X,d as Y,n as P,e as G,f as de,o as fe}from"../chunks/scheduler.CWFRzsjZ.js";import{A as z,l as W,y as N,t as y,S as Z,i as ee,e as j,o as te,s as R,c as se,a as U,b as D,p as ne,g as _,f as E,d as le,h as w,j as C,k as x,m as ae,w as pe,v as re,n as oe,r as T,C as me,x as q}from"../chunks/index.DWCIZltW.js";import{b as V}from"../chunks/paths.CTdxvrMC.js";import{l as _e,d as ge}from"../chunks/database.BjOdWBt2.js";import{a as ve}from"../chunks/imageUtils.Bvh6mqQ1.js";import{D as be}from"../chunks/Dialog.CO9vD5gH.js";function Q(n,e){const s=e.token={};function t(r,a,i,o){if(e.token!==s)return;e.resolved=o;let l=e.ctx;i!==void 0&&(l=l.slice(),l[i]=o);const c=r&&(e.current=r)(l);let g=!1;e.block&&(e.blocks?e.blocks.forEach(($,f)=>{f!==a&&$&&(z(),W($,1,1,()=>{e.blocks[f]===$&&(e.blocks[f]=null)}),N())}):e.block.d(1),c.c(),y(c,1),c.m(e.mount(),e.anchor),g=!0),e.block=c,e.blocks&&(e.blocks[a]=c),g&&he()}if(ce(n)){const r=ie();if(n.then(a=>{L(r),t(e.then,1,e.value,a),L(null)},a=>{if(L(r),t(e.catch,2,e.error,a),L(null),!e.hasCatch)throw a}),e.current!==e.pending)return t(e.pending,0),!0}else{if(e.current!==e.then)return t(e.then,1,e.value,n),!0;e.resolved=n}}function we(n,e,s){const t=e.slice(),{resolved:r}=n;n.current===n.then&&(t[n.value]=r),n.current===n.catch&&(t[n.error]=r),n.block.p(t,s)}function F(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function ke(n,e){W(n,1,1,()=>{e.delete(n.key)})}function Ce(n,e,s,t,r,a,i,o,l,c,g,$){let f=n.length,h=a.length,p=f;const d={};for(;p--;)d[n[p].key]=p;const m=[],v=new Map,A=new Map,u=[];for(p=h;p--;){const b=$(r,a,p),I=s(b);let M=i.get(I);M?u.push(()=>M.p(b,e)):(M=c(I,b),M.c()),v.set(I,m[p]=M),I in d&&A.set(I,Math.abs(p-d[I]))}const k=new Set,H=new Set;function S(b){y(b,1),b.m(o,g),i.set(b.key,b),g=b.first,h--}for(;f&&h;){const b=m[h-1],I=n[f-1],M=b.key,B=I.key;b===I?(g=b.first,f--,h--):v.has(B)?!i.has(M)||k.has(M)?S(b):H.has(B)?f--:A.get(M)>A.get(B)?(H.add(M),S(b)):(k.add(B),f--):(l(I,i),f--)}for(;f--;){const b=n[f];v.has(b.key)||l(b,i)}for(;h;)S(m[h-1]);return ue(u),m}function $e(n){return{c:P,l:P,m:P,p:P,d:P}}function je(n){let e,s;return{c(){e=j("img"),this.h()},l(t){e=U(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){G(e.src,s=n[2].src)||w(e,"src",s),w(e,"alt","Project thumbnail"),w(e,"class","thumbnail svelte-l1tr5i")},m(t,r){C(t,e,r)},p(t,r){r&4&&!G(e.src,s=t[2].src)&&w(e,"src",s)},d(t){t&&_(e)}}}function Ue(n){let e,s="Image loading...";return{c(){e=j("p"),e.textContent=s},l(t){e=U(t,"P",{"data-svelte-h":!0}),T(e)!=="svelte-9u03uz"&&(e.textContent=s)},m(t,r){C(t,e,r)},p:P,d(t){t&&_(e)}}}function He(n){let e,s,t=(n[0].name??"Unnamed Project")+"",r,a,i,o="Delete";return{c(){e=j("div"),s=j("h1"),r=te(t),a=R(),i=j("button"),i.textContent=o,this.h()},l(l){e=U(l,"DIV",{class:!0});var c=D(e);s=U(c,"H1",{class:!0});var g=D(s);r=ne(g,t),g.forEach(_),a=E(c),i=U(c,"BUTTON",{class:!0,"data-svelte-h":!0}),T(i)!=="svelte-1il9d26"&&(i.textContent=o),c.forEach(_),this.h()},h(){w(s,"class","svelte-l1tr5i"),i.disabled=!1,w(i,"class","delete-button svelte-l1tr5i"),w(e,"class","dialog svelte-l1tr5i")},m(l,c){C(l,e,c),x(e,s),x(s,r),x(e,a),x(e,i)},p(l,c){c&1&&t!==(t=(l[0].name??"Unnamed Project")+"")&&re(r,t)},d(l){l&&_(e)}}}function Ie(n){let e,s,t=(n[0].name??"Unnamed Project")+"",r,a,i,o,l,c,g,$,f,h={ctx:n,current:null,token:null,hasCatch:!1,pending:Ue,then:je,catch:$e,value:2};Q(i=n[2],h);let p={showDefaultCloseButton:!1,$$slots:{default:[He]},$$scope:{ctx:n}};return c=new be({props:p}),n[4](c),{c(){e=j("button"),s=j("h3"),r=te(t),a=R(),h.block.c(),l=R(),se(c.$$.fragment),this.h()},l(d){e=U(d,"BUTTON",{class:!0,"aria-label":!0});var m=D(e);s=U(m,"H3",{class:!0});var v=D(s);r=ne(v,t),v.forEach(_),a=E(m),h.block.l(m),m.forEach(_),l=E(d),le(c.$$.fragment,d),this.h()},h(){w(s,"class","svelte-l1tr5i"),w(e,"class","project exclude-global svelte-l1tr5i"),w(e,"aria-label",o="Project: "+(n[0].name??"Unnamed Project"))},m(d,m){C(d,e,m),x(e,s),x(s,r),x(e,a),h.block.m(e,h.anchor=null),h.mount=()=>e,h.anchor=null,C(d,l,m),ae(c,d,m),g=!0,$||(f=pe(e,"click",n[3]),$=!0)},p(d,[m]){n=d,(!g||m&1)&&t!==(t=(n[0].name??"Unnamed Project")+"")&&re(r,t),h.ctx=n,m&4&&i!==(i=n[2])&&Q(i,h)||we(h,n,m),(!g||m&1&&o!==(o="Project: "+(n[0].name??"Unnamed Project")))&&w(e,"aria-label",o);const v={};m&33&&(v.$$scope={dirty:m,ctx:n}),c.$set(v)},i(d){g||(y(c.$$.fragment,d),g=!0)},o(d){W(c.$$.fragment,d),g=!1},d(d){d&&(_(e),_(l)),h.block.d(),h.token=null,h=null,n[4](null),oe(c,d),$=!1,f()}}}function Me(n,e,s){let t,{project:r}=e,a;const i=()=>{a.open()};function o(l){Y[l?"unshift":"push"](()=>{a=l,s(1,a)})}return n.$$set=l=>{"project"in l&&s(0,r=l.project)},n.$$.update=()=>{n.$$.dirty&1&&s(2,t=r.thumbnail!==null?ve(r.thumbnail.buffer):new Promise(l=>{const c=new Image;c.onload=()=>{l(c)},c.src=`${V}/no_image.png`}))},[r,a,t,i,o]}class xe extends Z{constructor(e){super(),ee(this,e,Me,Ie,X,{project:0})}}class O{constructor(e="",s=!0){this.hash=e,this.autoUpdateWindowHash=s}static fromWindow(e=!0){return new O(window.location.hash.slice(1),e)}updateWindowHash(){return window.location.hash=this.hash===""?"":`#${this.hash}`,this.hash}get(e){return this.getAllHashes()[e]??null}set(e,s){const t=this.getHashString(e,s);return this.contains(e)?this.hash=this.hash.replace(new RegExp(`(${encodeURIComponent(e)}=.+?,)|(${encodeURIComponent(e)}=.+?$)`),`${t},`):(this.hash!==""&&(this.hash+=","),this.hash+=`${t}`),this.removeLeadingAndTrailingCommas(),this.autoUpdateWindowHash&&this.updateWindowHash(),this.hash}delete(e){if(!this.contains(e))return null;const s=this.get(e);return this.hash=this.hash.replace(new RegExp(`(${encodeURIComponent(e)}=.+?,)|(${encodeURIComponent(e)}=.+?$)`),",").replace(/,+/,","),this.removeLeadingAndTrailingCommas(),this.autoUpdateWindowHash&&this.updateWindowHash(),s}contains(e){return new RegExp(`(${encodeURIComponent(e)}=.+?,)|(${encodeURIComponent(e)}=.+?$)`).test(this.hash)}getAllHashes(){const e=this.hash.split(","),s={};for(const t of e){if(t==="")continue;const r=t.split("="),a=decodeURIComponent(r[0]),i=decodeURIComponent(r[1]);s[a]=i}return s}getHashString(e,s){return`${encodeURIComponent(e)}=${encodeURIComponent(s)}`}removeLeadingAndTrailingCommas(){var t,r,a,i;if(!this.hash.startsWith(",")&&!this.hash.endsWith(","))return this.hash;const e=((r=(t=this.hash.match(/^,+/))==null?void 0:t[0])==null?void 0:r.length)??0,s=-(((i=(a=this.hash.match(/,+$/))==null?void 0:a[0])==null?void 0:i.length)??-this.hash.length);return this.hash=this.hash.slice(e,s),this.hash}}function J(n,e,s){const t=n.slice();return t[5]=e[s],t}function Pe(n){let e,s="Work in progress! Saving projects are not supported yet";return{c(){e=j("h3"),e.textContent=s,this.h()},l(t){e=U(t,"H3",{class:!0,"data-svelte-h":!0}),T(e)!=="svelte-zpyi1"&&(e.textContent=s),this.h()},h(){w(e,"class","svelte-act1aa")},m(t,r){C(t,e,r)},p:P,i:P,o:P,d(t){t&&_(e)}}}function Re(n){let e=[],s=new Map,t,r,a=F(n[0]??[]);const i=o=>o[5].id;for(let o=0;o<a.length;o+=1){let l=J(n,a,o),c=i(l);s.set(c,e[o]=K(c,l))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();t=q()},l(o){for(let l=0;l<e.length;l+=1)e[l].l(o);t=q()},m(o,l){for(let c=0;c<e.length;c+=1)e[c]&&e[c].m(o,l);C(o,t,l),r=!0},p(o,l){l&1&&(a=F(o[0]??[]),z(),e=Ce(e,l,i,1,o,a,s,t.parentNode,ke,K,t,J),N())},i(o){if(!r){for(let l=0;l<a.length;l+=1)y(e[l]);r=!0}},o(o){for(let l=0;l<e.length;l+=1)W(e[l]);r=!1},d(o){o&&_(t);for(let l=0;l<e.length;l+=1)e[l].d(o)}}}function K(n,e){let s,t,r;return t=new xe({props:{project:e[5]}}),{key:n,first:null,c(){s=q(),se(t.$$.fragment),this.h()},l(a){s=q(),le(t.$$.fragment,a),this.h()},h(){this.first=s},m(a,i){C(a,s,i),ae(t,a,i),r=!0},p(a,i){e=a;const o={};i&1&&(o.project=e[5]),t.$set(o)},i(a){r||(y(t.$$.fragment,a),r=!0)},o(a){W(t.$$.fragment,a),r=!1},d(a){a&&_(s),oe(t,a)}}}function Ee(n){let e,s,t="Melvor Map Maker",r,a,i="",o,l,c,g="Saved Projects",$,f,h,p,d;const m=[Re,Pe],v=[];function A(u,k){return u[2]>0?0:1}return h=A(n),p=v[h]=m[h](n),{c(){e=R(),s=j("h1"),s.textContent=t,r=R(),a=j("a"),a.innerHTML=i,o=R(),l=j("div"),c=j("h2"),c.textContent=g,$=R(),f=j("div"),p.c(),this.h()},l(u){me("svelte-1bq5zbc",document.head).forEach(_),e=E(u),s=U(u,"H1",{class:!0,"data-svelte-h":!0}),T(s)!=="svelte-1w6u9bb"&&(s.textContent=t),r=E(u),a=U(u,"A",{href:!0,class:!0,"data-svelte-h":!0}),T(a)!=="svelte-1vm4tsh"&&(a.innerHTML=i),o=E(u),l=U(u,"DIV",{class:!0});var H=D(l);c=U(H,"H2",{"data-svelte-h":!0}),T(c)!=="svelte-1cctxi5"&&(c.textContent=g),$=E(H),f=U(H,"DIV",{class:!0});var S=D(f);p.l(S),S.forEach(_),H.forEach(_),this.h()},h(){document.title="Melvor Map Maker",w(s,"class","svelte-act1aa"),w(a,"href",V),w(a,"class","svelte-act1aa"),w(f,"class","project-container svelte-act1aa"),w(l,"class","projects svelte-act1aa")},m(u,k){C(u,e,k),C(u,s,k),C(u,r,k),C(u,a,k),n[4](a),C(u,o,k),C(u,l,k),x(l,c),x(l,$),x(l,f),v[h].m(f,null),d=!0},p(u,[k]){let H=h;h=A(u),h===H?v[h].p(u,k):(z(),W(v[H],1,1,()=>{v[H]=null}),N(),p=v[h],p?p.p(u,k):(p=v[h]=m[h](u),p.c()),y(p,1),p.m(f,null))},i(u){d||(y(p),d=!0)},o(u){W(p),d=!1},d(u){u&&(_(e),_(s),_(r),_(a),_(o),_(l)),n[4](null),v[h].d()}}}function We(n,e,s){let t,r,a,i=_e(()=>ge.projects.toArray());de(n,i,l=>s(0,r=l)),fe(()=>{const c=O.fromWindow().get("route");c!==null&&(s(1,a.href=`${V}/${c}`,a),a.click())});function o(l){Y[l?"unshift":"push"](()=>{a=l,s(1,a)})}return n.$$.update=()=>{n.$$.dirty&1&&s(2,t=(r==null?void 0:r.length)??0)},[r,a,t,i,o]}class Le extends Z{constructor(e){super(),ee(this,e,We,Ee,X,{})}}export{Le as component};