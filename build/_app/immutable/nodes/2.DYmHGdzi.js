import{a as O,c as j,u as q,g as A,b as E,d as y,e as D}from"../chunks/scheduler.CWFRzsjZ.js";import{S as H,i as U,e as v,c as w,s as T,a as k,b as z,d as I,f as L,g as p,h as u,j as S,m as P,k as b,t as $,l as d,n as R,o as V,p as G}from"../chunks/index.BXGTNUih.js";import{b as C}from"../chunks/paths.Dl56lNOo.js";import{r as M}from"../chunks/imageUtils.Ch6fHfqa.js";import{s as B}from"../chunks/store.DiTc2wrj.js";import{T as F,D as J,a as K}from"../chunks/ToolbarItem.DyEiok1T.js";function N(n){let e;return{c(){e=V("Preview Image")},l(s){e=G(s,"Preview Image")},m(s,o){S(s,e,o)},d(s){s&&p(e)}}}function Q(n){var o;let e,s;return e=new K({props:{imageSRC:C+"/preview.png",imageAltText:"A document and a magnifying glass",imageOnClick:(o=n[0])==null?void 0:o.toggle,$$slots:{default:[N]},$$scope:{ctx:n}}}),{c(){w(e.$$.fragment)},l(a){I(e.$$.fragment,a)},m(a,f){P(e,a,f),s=!0},p(a,f){var c;const i={};f&1&&(i.imageOnClick=(c=a[0])==null?void 0:c.toggle),f&64&&(i.$$scope={dirty:f,ctx:a}),e.$set(i)},i(a){s||($(e.$$.fragment,a),s=!0)},o(a){d(e.$$.fragment,a),s=!1},d(a){R(e,a)}}}function W(n){let e,s;return{c(){e=v("img"),this.h()},l(o){e=k(o,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){D(e.src,s=n[2])||u(e,"src",s),u(e,"alt","Preview"),u(e,"class","preview svelte-18x1kz9")},m(o,a){S(o,e,a),n[4](e)},p(o,a){a&4&&!D(e.src,s=o[2])&&u(e,"src",s)},d(o){o&&p(e),n[4](null)}}}function X(n){let e,s,o,a,f,i,c;s=new F({props:{$$slots:{default:[Q]},$$scope:{ctx:n}}});let h={$$slots:{default:[W]},$$scope:{ctx:n}};a=new J({props:h}),n[5](a);const g=n[3].default,l=j(g,n,n[6],null);return{c(){e=v("div"),w(s.$$.fragment),o=T(),w(a.$$.fragment),f=T(),i=v("div"),l&&l.c(),this.h()},l(t){e=k(t,"DIV",{class:!0});var r=z(e);I(s.$$.fragment,r),o=L(r),I(a.$$.fragment,r),f=L(r),i=k(r,"DIV",{class:!0});var m=z(i);l&&l.l(m),m.forEach(p),r.forEach(p),this.h()},h(){u(i,"class","main"),u(e,"class","container svelte-18x1kz9")},m(t,r){S(t,e,r),P(s,e,null),b(e,o),P(a,e,null),b(e,f),b(e,i),l&&l.m(i,null),c=!0},p(t,[r]){const m={};r&65&&(m.$$scope={dirty:r,ctx:t}),s.$set(m);const _={};r&70&&(_.$$scope={dirty:r,ctx:t}),a.$set(_),l&&l.p&&(!c||r&64)&&q(l,g,t,t[6],c?E(g,t[6],r,null):A(t[6]),null)},i(t){c||($(s.$$.fragment,t),$(a.$$.fragment,t),$(l,t),c=!0)},o(t){d(s.$$.fragment,t),d(a.$$.fragment,t),d(l,t),c=!1},d(t){t&&p(e),R(s),n[5](null),R(a),l&&l.d(t)}}}function Y(n,e,s){let{$$slots:o={},$$scope:a}=e,f,i,c=`${C}/black.png`;async function h(t){if(URL.revokeObjectURL(c),t===null){s(2,c=`${C}/black.png`);return}const r=document.body.offsetHeight*.75*devicePixelRatio,m=document.body.offsetHeight*.75*devicePixelRatio,_=await M(t,{type:"to",x:r,y:m},"url");s(2,c=_)}B.subscribe(t=>{h(t.mapImage)});function g(t){y[t?"unshift":"push"](()=>{i=t,s(1,i)})}function l(t){y[t?"unshift":"push"](()=>{f=t,s(0,f)})}return n.$$set=t=>{"$$scope"in t&&s(6,a=t.$$scope)},[f,i,c,o,g,l,a]}class ne extends H{constructor(e){super(),U(this,e,Y,X,O,{})}}export{ne as component};
