import{a as S,n as h,o as D,f as F}from"../chunks/scheduler.CWFRzsjZ.js";import{S as T,i as j,s as x,e as v,B as q,g as u,f as y,a as g,r as L,h as z,j as b,w as H,l as M,x as N,t as w,z as P,o as $,b as k,p as E,k as m,v as I,c as V,d as B,m as G,n as R}from"../chunks/index.BXGTNUih.js";import{s as U}from"../chunks/entry.DPWgRTFP.js";const A=()=>{const a=U;return{page:{subscribe:a.page.subscribe},navigating:{subscribe:a.navigating.subscribe},updated:a.updated}},J={subscribe(a){return A().page.subscribe(a)}};function K(a){let e,s,t=`<h1>Error: 404</h1> <p>To navigate back to the home page, click the icon in the top left corner of
    the page</p>`;return{c(){e=x(),s=v("div"),s.innerHTML=t,this.h()},l(r){q("svelte-11rapdj",document.head).forEach(u),e=y(r),s=g(r,"DIV",{class:!0,"data-svelte-h":!0}),L(s)!=="svelte-170rwkh"&&(s.innerHTML=t),this.h()},h(){document.title="Page Not Found",z(s,"class","container svelte-57pnob")},m(r,c){b(r,e,c),b(r,s,c)},p:h,i:h,o:h,d(r){r&&(u(e),u(s))}}}function O(a){const e=new Map([[/^\/file ?generator$/i,encodeURIComponent("File Generator")]]);return D(()=>{const s=window.location.pathname.replace(/^\/Melvor-Map-Maker\//,"/");for(const[t,r]of e.entries())t.test(s)&&(window.location.pathname=`/Melvor-Map-Maker/${r}`)}),[]}class Q extends T{constructor(e){super(),j(this,e,O,K,S,{})}}function W(a){var o;let e,s,t,r=a[0].status+"",c,p,d,i=((o=a[0].error)==null?void 0:o.message)+"",f;return{c(){e=v("div"),s=v("h1"),t=$("Error: "),c=$(r),p=x(),d=v("p"),f=$(i),this.h()},l(n){e=g(n,"DIV",{class:!0});var l=k(e);s=g(l,"H1",{});var _=k(s);t=E(_,"Error: "),c=E(_,r),_.forEach(u),p=y(l),d=g(l,"P",{});var C=k(d);f=E(C,i),C.forEach(u),l.forEach(u),this.h()},h(){z(e,"class","container svelte-57pnob")},m(n,l){b(n,e,l),m(e,s),m(s,t),m(s,c),m(e,p),m(e,d),m(d,f)},p(n,l){var _;l&1&&r!==(r=n[0].status+"")&&I(c,r),l&1&&i!==(i=((_=n[0].error)==null?void 0:_.message)+"")&&I(f,i)},i:h,o:h,d(n){n&&u(e)}}}function X(a){let e,s;return e=new Q({}),{c(){V(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,r){G(e,t,r),s=!0},p:h,i(t){s||(w(e.$$.fragment,t),s=!0)},o(t){M(e.$$.fragment,t),s=!1},d(t){R(e,t)}}}function Y(a){let e,s,t,r,c,p;document.title=e="Error: "+a[0].status;const d=[X,W],i=[];function f(o,n){return o[0].status===404?0:1}return t=f(a),r=i[t]=d[t](a),{c(){s=x(),r.c(),c=H()},l(o){q("svelte-dzcaaq",document.head).forEach(u),s=y(o),r.l(o),c=H()},m(o,n){b(o,s,n),i[t].m(o,n),b(o,c,n),p=!0},p(o,[n]){(!p||n&1)&&e!==(e="Error: "+o[0].status)&&(document.title=e);let l=t;t=f(o),t===l?i[t].p(o,n):(P(),M(i[l],1,1,()=>{i[l]=null}),N(),r=i[t],r?r.p(o,n):(r=i[t]=d[t](o),r.c()),w(r,1),r.m(c.parentNode,c))},i(o){p||(w(r),p=!0)},o(o){M(r),p=!1},d(o){o&&(u(s),u(c)),i[t].d(o)}}}function Z(a,e,s){let t;return F(a,J,r=>s(0,t=r)),[t]}let se=class extends T{constructor(e){super(),j(this,e,Z,Y,S,{})}};export{se as component};
