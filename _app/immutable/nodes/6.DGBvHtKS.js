import{a as c,n as i,o as m,d}from"../chunks/scheduler.CWFRzsjZ.js";import{S as l,i as p,e as f,a as h,b as _,g as r,h as v,j as u,s as $,c as g,B as w,f as O,d as S,m as b,t as x,l as y,n as q}from"../chunks/index.BXGTNUih.js";import{i as A}from"../chunks/store.C2j4PXn_.js";function C(o){let e;return{c(){e=f("canvas"),this.h()},l(t){e=h(t,"CANVAS",{class:!0}),_(e).forEach(r),this.h()},h(){v(e,"class","svelte-16d98qh")},m(t,s){u(t,e,s),o[1](e)},p:i,i,o:i,d(t){t&&r(e),o[1](null)}}}function z(o,e,t){let s;m(async()=>{const a=document.querySelector(".container");await A({canvas:s,appOptions:{resizeTo:a??void 0,resolution:window.devicePixelRatio??1.5},viewportOptions:{constructorOptions:{passiveWheel:!1},pluginOptions:{decelerateOptions:{minSpeed:.3,friction:.96},wheelOptions:{percent:10}}}})});function n(a){d[a?"unshift":"push"](()=>{s=a,t(0,s)})}return[s,n]}class B extends l{constructor(e){super(),p(this,e,z,C,c,{})}}function E(o){let e,t,s;return t=new B({}),{c(){e=$(),g(t.$$.fragment),this.h()},l(n){w("svelte-1ua6lp0",document.head).forEach(r),e=O(n),S(t.$$.fragment,n),this.h()},h(){document.title="Map Builder"},m(n,a){u(n,e,a),b(t,n,a),s=!0},p:i,i(n){s||(x(t.$$.fragment,n),s=!0)},o(n){y(t.$$.fragment,n),s=!1},d(n){n&&r(e),q(t,n)}}}class j extends l{constructor(e){super(),p(this,e,null,E,c,{})}}export{j as component};
