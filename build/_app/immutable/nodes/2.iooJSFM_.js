import{a as M,c as V,b as A,u as z,g as N,d as F,e as E}from"../chunks/scheduler.DahwKfaf.js";import{S as J,i as K,e as $,c as U,s as y,a as h,b as O,d as j,f as P,g as Q,h as C,j as _,k as B,m as G,l as d,n as W,t as S,o as D,p as H,q as X,r as Y}from"../chunks/index.C-CCz6-d.js";import{b as L}from"../chunks/paths.Be8sZeBA.js";import{T as Z,a as x}from"../chunks/ToolbarItem.Zfx_4Cb3.js";import{s as ee,r as te}from"../chunks/store.BWAkgWu5.js";function se(r){let e;return{c(){e=X("Preview Image")},l(t){e=Y(t,"Preview Image")},m(t,o){B(t,e,o)},d(t){t&&C(e)}}}function ae(r){let e,t;return e=new x({props:{imageSRC:L+"/preview.png",imageAltText:"A document and a magnifying glass",imageOnClick:r[3],$$slots:{default:[se]},$$scope:{ctx:r}}}),{c(){U(e.$$.fragment)},l(o){j(e.$$.fragment,o)},m(o,l){G(e,o,l),t=!0},p(o,l){const s={};l&256&&(s.$$scope={dirty:l,ctx:o}),e.$set(s)},i(o){t||(S(e.$$.fragment,o),t=!0)},o(o){D(e.$$.fragment,o),t=!1},d(o){H(e,o)}}}function oe(r){let e,t,o,l,s,g,p,v,b,f,k="Close",w,a,m,I,R;t=new Z({props:{$$slots:{default:[ae]},$$scope:{ctx:r}}});const T=r[5].default,c=V(T,r,r[8],null);return{c(){e=$("div"),U(t.$$.fragment),o=y(),l=$("dialog"),s=$("img"),p=y(),v=$("br"),b=y(),f=$("button"),f.textContent=k,w=y(),a=$("div"),c&&c.c(),this.h()},l(n){e=h(n,"DIV",{class:!0});var i=O(e);j(t.$$.fragment,i),o=P(i),l=h(i,"DIALOG",{class:!0});var u=O(l);s=h(u,"IMG",{src:!0,alt:!0,class:!0}),p=P(u),v=h(u,"BR",{}),b=P(u),f=h(u,"BUTTON",{class:!0,"data-svelte-h":!0}),Q(f)!=="svelte-1f187om"&&(f.textContent=k),u.forEach(C),w=P(i),a=h(i,"DIV",{class:!0});var q=O(a);c&&c.l(q),q.forEach(C),i.forEach(C),this.h()},h(){A(s.src,g=r[2])||_(s,"src",g),_(s,"alt","Preview"),_(s,"class","svelte-15vdm1f"),_(f,"class","svelte-15vdm1f"),_(l,"class","modal svelte-15vdm1f"),_(a,"class","main"),_(e,"class","container svelte-15vdm1f")},m(n,i){B(n,e,i),G(t,e,null),d(e,o),d(e,l),d(l,s),r[6](s),d(l,p),d(l,v),d(l,b),d(l,f),r[7](l),d(e,w),d(e,a),c&&c.m(a,null),m=!0,I||(R=W(f,"click",r[4]),I=!0)},p(n,[i]){const u={};i&256&&(u.$$scope={dirty:i,ctx:n}),t.$set(u),(!m||i&4&&!A(s.src,g=n[2]))&&_(s,"src",g),c&&c.p&&(!m||i&256)&&z(c,T,n,n[8],m?F(T,n[8],i,null):N(n[8]),null)},i(n){m||(S(t.$$.fragment,n),S(c,n),m=!0)},o(n){D(t.$$.fragment,n),D(c,n),m=!1},d(n){n&&C(e),H(t),r[6](null),r[7](null),c&&c.d(n),I=!1,R()}}}function le(r,e,t){let{$$slots:o={},$$scope:l}=e,s,g,p=`${L}/black.png`;function v(){s.open?s.close():s.showModal()}async function b(a){if(URL.revokeObjectURL(p),a===null){t(2,p=`${L}/black.png`);return}const m=document.body.offsetHeight*.75*devicePixelRatio,I=document.body.offsetHeight*.75*devicePixelRatio,R=await te(a,{type:"to",x:m,y:I},"url");t(2,p=R)}function f(){s.close()}ee.subscribe(a=>{b(a.mapImage)});function k(a){E[a?"unshift":"push"](()=>{g=a,t(1,g)})}function w(a){E[a?"unshift":"push"](()=>{s=a,t(0,s)})}return r.$$set=a=>{"$$scope"in a&&t(8,l=a.$$scope)},[s,g,p,v,f,o,k,w,l]}class me extends J{constructor(e){super(),K(this,e,le,oe,M,{})}}export{me as component};