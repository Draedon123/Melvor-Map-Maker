import{a as S,c as q,u as y,g as A,d as C}from"../chunks/scheduler.DahwKfaf.js";import{S as D,i as E,e as p,c as b,s as P,a as _,b as d,d as v,f as V,h as f,j as g,k as T,m as w,l as h,t as u,o as $,p as I,q as j,r as k}from"../chunks/index.C-CCz6-d.js";import{b as L}from"../chunks/paths.B0YEtpEc.js";import{T as R,a as z}from"../chunks/ToolbarItem.Zfx_4Cb3.js";function B(){let s;return{c(){s=j("Placeholder")},l(a){s=k(a,"Placeholder")},m(a,t){T(a,s,t)},d(a){a&&f(s)}}}function F(s){let a,t;return a=new z({props:{imageSRC:L+"/preview.png",imageAltText:"A document and a magnifying glass",$$slots:{default:[B]},$$scope:{ctx:s}}}),{c(){b(a.$$.fragment)},l(s){v(a.$$.fragment,s)},m(s,e){w(a,s,e),t=1},p(s,t){const e={};2&t&&(e.$$scope={dirty:t,ctx:s}),a.$set(e)},i(s){t||(u(a.$$.fragment,s),t=1)},o(s){$(a.$$.fragment,s),t=0},d(s){I(a,s)}}}function G(s){let a,t,e,n,c;t=new R({props:{$$slots:{default:[F]},$$scope:{ctx:s}}});const o=s[0].default,r=q(o,s,s[1],null);return{c(){a=p("div"),b(t.$$.fragment),e=P(),n=p("div"),r&&r.c(),this.h()},l(s){a=_(s,"DIV",{class:1});var c=d(a);v(t.$$.fragment,c),e=V(c),n=_(c,"DIV",{class:1});var $=d(n);r&&r.l($),$.forEach(f),c.forEach(f),this.h()},h(){g(n,"class","main"),g(a,"class","container svelte-bp9al7")},m(s,$){T(s,a,$),w(t,a,null),h(a,e),h(a,n),r&&r.m(n,null),c=1},p(s,[a]){const e={};2&a&&(e.$$scope={dirty:a,ctx:s}),t.$set(e),r&&r.p&&(!c||2&a)&&y(r,o,s,s[1],c?C(o,s[1],a,null):A(s[1]),null)},i(s){c||(u(t.$$.fragment,s),u(r,s),c=1)},o(s){$(t.$$.fragment,s),$(r,s),c=0},d(s){s&&f(a),I(t),r&&r.d(s)}}}function H(s,a,t){let{$$slots:e={},$$scope:n}=a;return s.$$set=s=>{"$$scope"in s&&t(1,n=s.$$scope)},[e,n]}class O extends D{constructor(s){super(),E(this,s,H,G,S,{})}}export{O as component};