import{a as T,c as b,u as k,g as A,b as E,e as S,i as q}from"./scheduler.CEYuN9sw.js";import{S as I,i as O,e as d,a as h,b as v,g as _,h as c,j as R,t as w,l as j,s as y,f as D,k as p,r as N}from"./index.C0VDjlZ-.js";function P(a){let e,t;const r=a[1].default,l=b(r,a,a[0],null);return{c(){e=d("aside"),l&&l.c(),this.h()},l(s){e=h(s,"ASIDE",{class:!0});var i=v(e);l&&l.l(i),i.forEach(_),this.h()},h(){c(e,"class","toolbar svelte-1nxu1jd")},m(s,i){R(s,e,i),l&&l.m(e,null),t=!0},p(s,[i]){l&&l.p&&(!t||i&1)&&k(l,r,s,s[0],t?E(r,s[0],i,null):A(s[0]),null)},i(s){t||(w(l,s),t=!0)},o(s){j(l,s),t=!1},d(s){s&&_(e),l&&l.d(s)}}}function U(a,e,t){let{$$slots:r={},$$scope:l}=e;return a.$$set=s=>{"$$scope"in s&&t(0,l=s.$$scope)},[l,r]}class G extends I{constructor(e){super(),O(this,e,U,P,T,{})}}function V(a){let e,t,r,l,s,i,m,f;const g=a[4].default,n=b(g,a,a[3],null);return{c(){e=d("div"),t=d("input"),l=y(),s=d("span"),n&&n.c(),this.h()},l(u){e=h(u,"DIV",{class:!0});var o=v(e);t=h(o,"INPUT",{type:!0,src:!0,alt:!0,class:!0}),l=D(o),s=h(o,"SPAN",{class:!0});var C=v(s);n&&n.l(C),C.forEach(_),o.forEach(_),this.h()},h(){c(t,"type","image"),S(t.src,r=a[0])||c(t,"src",r),c(t,"alt",a[1]),c(t,"class","svelte-18repw"),c(s,"class","svelte-18repw"),c(e,"class","svelte-18repw")},m(u,o){R(u,e,o),p(e,t),p(e,l),p(e,s),n&&n.m(s,null),i=!0,m||(f=N(t,"click",function(){q(a[2])&&a[2].apply(this,arguments)}),m=!0)},p(u,[o]){a=u,(!i||o&1&&!S(t.src,r=a[0]))&&c(t,"src",r),(!i||o&2)&&c(t,"alt",a[1]),n&&n.p&&(!i||o&8)&&k(n,g,a,a[3],i?E(g,a[3],o,null):A(a[3]),null)},i(u){i||(w(n,u),i=!0)},o(u){j(n,u),i=!1},d(u){u&&_(e),n&&n.d(u),m=!1,f()}}}function z(a,e,t){let{$$slots:r={},$$scope:l}=e,{imageSRC:s}=e,{imageAltText:i}=e,{imageOnClick:m=()=>{}}=e;return a.$$set=f=>{"imageSRC"in f&&t(0,s=f.imageSRC),"imageAltText"in f&&t(1,i=f.imageAltText),"imageOnClick"in f&&t(2,m=f.imageOnClick),"$$scope"in f&&t(3,l=f.$$scope)},[s,i,m,l,r]}class H extends I{constructor(e){super(),O(this,e,z,V,T,{imageSRC:0,imageAltText:1,imageOnClick:2})}}export{G as T,H as a};