import{D as Bt,k as S,b as Z,j as It,f as Mt,T as zt,n as tt,w as Ct}from"./store.C2j4PXn_.js";const C=Object.create(null),et=Object.create(null);function J(r,t){let e=et[r];return e===void 0&&(C[t]===void 0&&(C[t]=1),et[r]=e=C[t]++),e}let w;function mt(){return(!w||w!=null&&w.isContextLost())&&(w=Bt.get().createCanvas().getContext("webgl",{})),w}let M;function Rt(){if(!M){M="mediump";const r=mt();r&&r.getShaderPrecisionFormat&&(M=r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision?"highp":"mediump")}return M}function Gt(r,t,e){return t?r:e?(r=r.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${r}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${r}
        `}function Dt(r,t,e){const i=e?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if(r.substring(0,9)!=="precision"){let n=e?t.requestedFragmentPrecision:t.requestedVertexPrecision;return n==="highp"&&i!=="highp"&&(n="mediump"),`precision ${n} float;
${r}`}else if(i!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}function Ft(r,t){return t?`#version 300 es
${r}`:r}const Vt={},Ut={};function $t(r,{name:t="pixi-program"},e=!0){t=t.replace(/\s+/g,"-"),t+=e?"-fragment":"-vertex";const i=e?Vt:Ut;return i[t]?(i[t]++,t+=`-${i[t]}`):i[t]=1,r.indexOf("#define SHADER_NAME")!==-1?r:`${`#define SHADER_NAME ${t}`}
${r}`}function kt(r,t){return t?r.replace("#version 300 es",""):r}const R={stripVersion:kt,ensurePrecision:Dt,addProgramDefines:Gt,setProgramName:$t,insertVersion:Ft},G=Object.create(null),pt=class X{constructor(t){t={...X.defaultOptions,...t};const e=t.fragment.indexOf("#version 300 es")!==-1,i={stripVersion:e,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:Rt()},setProgramName:{name:t.name},addProgramDefines:e,insertVersion:e};let n=t.fragment,s=t.vertex;Object.keys(R).forEach(o=>{const a=i[o];n=R[o](n,a,!0),s=R[o](s,a,!1)}),this.fragment=n,this.vertex=s,this._key=J(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){const e=`${t.vertex}:${t.fragment}`;return G[e]||(G[e]=new X(t)),G[e]}};pt.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let gt=pt;const rt={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function Ot(r){return rt[r]??rt.float32}const Nt={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function Lt({source:r,entryPoint:t}){const e={},i=r.indexOf(`fn ${t}`);if(i!==-1){const n=r.indexOf("->",i);if(n!==-1){const s=r.substring(i,n),o=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let a;for(;(a=o.exec(s))!==null;){const u=Nt[a[3]]??"float32";e[a[2]]={location:parseInt(a[1],10),format:u,stride:Ot(u).stride,offset:0,instance:!1,start:0}}}}return e}function D(r){var l,m;const t=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,e=/@group\((\d+)\)/,i=/@binding\((\d+)\)/,n=/var(<[^>]+>)? (\w+)/,s=/:\s*(\w+)/,o=/struct\s+(\w+)\s*{([^}]+)}/g,a=/(\w+)\s*:\s*([\w\<\>]+)/g,u=/struct\s+(\w+)/,f=(l=r.match(t))==null?void 0:l.map(h=>({group:parseInt(h.match(e)[1],10),binding:parseInt(h.match(i)[1],10),name:h.match(n)[2],isUniform:h.match(n)[1]==="<uniform>",type:h.match(s)[1]}));if(!f)return{groups:[],structs:[]};const c=((m=r.match(o))==null?void 0:m.map(h=>{const p=h.match(u)[1],d=h.match(a).reduce((_,g)=>{const[b,v]=g.split(":");return _[b.trim()]=v.trim(),_},{});return d?{name:p,members:d}:null}).filter(({name:h})=>f.some(p=>p.type===h)))??[];return{groups:f,structs:c}}var T=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(T||{});function jt({groups:r}){const t=[];for(let e=0;e<r.length;e++){const i=r[e];t[i.group]||(t[i.group]=[]),i.isUniform?t[i.group].push({binding:i.binding,visibility:T.VERTEX|T.FRAGMENT,buffer:{type:"uniform"}}):i.type==="sampler"?t[i.group].push({binding:i.binding,visibility:T.FRAGMENT,sampler:{type:"filtering"}}):i.type==="texture_2d"&&t[i.group].push({binding:i.binding,visibility:T.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}function Ht({groups:r}){const t=[];for(let e=0;e<r.length;e++){const i=r[e];t[i.group]||(t[i.group]={}),t[i.group][i.name]=i.binding}return t}function Yt(r,t){const e=new Set,i=new Set,n=[...r.structs,...t.structs].filter(o=>e.has(o.name)?!1:(e.add(o.name),!0)),s=[...r.groups,...t.groups].filter(o=>{const a=`${o.name}-${o.binding}`;return i.has(a)?!1:(i.add(a),!0)});return{structs:n,groups:s}}const F=Object.create(null);class z{constructor(t){var a,u;this._layoutKey=0;const{fragment:e,vertex:i,layout:n,gpuLayout:s,name:o}=t;if(this.name=o,this.fragment=e,this.vertex=i,e.source===i.source){const f=D(e.source);this.structsAndGroups=f}else{const f=D(i.source),c=D(e.source);this.structsAndGroups=Yt(f,c)}this.layout=n??Ht(this.structsAndGroups),this.gpuLayout=s??jt(this.structsAndGroups),this.autoAssignGlobalUniforms=((a=this.layout[0])==null?void 0:a.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((u=this.layout[1])==null?void 0:u.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:t,fragment:e}=this,i=t.source+e.source+t.entryPoint+e.entryPoint;this._layoutKey=J(i,"program")}get attributeData(){return this._attributeData??(this._attributeData=Lt(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return F[e]||(F[e]=new z(t)),F[e]}}const xt=["f32","i32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","mat3x3<f32>","mat4x4<f32>","mat3x2<f32>","mat4x2<f32>","mat2x3<f32>","mat4x3<f32>","mat2x4<f32>","mat3x4<f32>"],Wt=xt.reduce((r,t)=>(r[t]=!0,r),{});function Xt(r,t){switch(r){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const vt=class bt{constructor(t,e){this._touched=0,this.uid=S("uniform"),this._resourceType="uniformGroup",this._resourceId=S("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,e={...bt.defaultOptions,...e},this.uniformStructures=t;const i={};for(const n in t){const s=t[n];if(s.name=n,s.size=s.size??1,!Wt[s.type])throw new Error(`Uniform type ${s.type} is not supported. Supported uniform types are: ${xt.join(", ")}`);s.value??(s.value=Xt(s.type,s.size)),i[n]=s.value}this.uniforms=i,this._dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this._signature=J(Object.keys(i).map(n=>`${n}-${t[n].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};vt.defaultOptions={ubo:!1,isStatic:!1};let Kt=vt;class V{constructor(t){this.resources=Object.create(null),this._dirty=!0;let e=0;for(const i in t){const n=t[i];this.setResource(n,e++)}this._updateKey()}_updateKey(){if(!this._dirty)return;this._dirty=!1;const t=[];let e=0;for(const i in this.resources)t[e++]=this.resources[i]._resourceId;this._key=t.join("|")}setResource(t,e){var n,s;const i=this.resources[e];t!==i&&(i&&((n=t.off)==null||n.call(t,"change",this.onResourceChange,this)),(s=t.on)==null||s.call(t,"change",this.onResourceChange,this),this.resources[e]=t,this._dirty=!0)}getResource(t){return this.resources[t]}_touch(t){const e=this.resources;for(const i in e)e[i]._touched=t}destroy(){var e;const t=this.resources;for(const i in t){const n=t[i];(e=n.off)==null||e.call(n,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(t){if(this._dirty=!0,t.destroyed){const e=this.resources;for(const i in e)e[i]===t&&(e[i]=null)}else this._updateKey()}}var K=(r=>(r[r.WEBGL=1]="WEBGL",r[r.WEBGPU=2]="WEBGPU",r[r.BOTH=3]="BOTH",r))(K||{});class _t extends Z{constructor(t){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:e,glProgram:i,groups:n,resources:s,compatibleRenderers:o,groupMap:a}=t;this.gpuProgram=e,this.glProgram=i,o===void 0&&(o=0,e&&(o|=K.WEBGPU),i&&(o|=K.WEBGL)),this.compatibleRenderers=o;const u={};if(!s&&!n&&(s={}),s&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!e&&n&&!a)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&n&&a)for(const f in a)for(const c in a[f]){const l=a[f][c];u[l]={group:f,binding:c,name:l}}else if(e&&n&&!a){const f=e.structsAndGroups.groups;a={},f.forEach(c=>{a[c.group]=a[c.group]||{},a[c.group][c.binding]=c.name,u[c.name]=c})}else if(s){n={},a={},e&&e.structsAndGroups.groups.forEach(l=>{a[l.group]=a[l.group]||{},a[l.group][l.binding]=l.name,u[l.name]=l});let f=0;for(const c in s)u[c]||(n[99]||(n[99]=new V,this._ownedBindGroups.push(n[99])),u[c]={group:99,binding:f,name:c},a[99]=a[99]||{},a[99][f]=c,f++);for(const c in s){const l=c;let m=s[c];!m.source&&!m._resourceType&&(m=new Kt(m));const h=u[l];h&&(n[h.group]||(n[h.group]=new V,this._ownedBindGroups.push(n[h.group])),n[h.group].setResource(m,h.binding))}}this.groups=n,this._uniformBindMap=a,this.resources=this._buildResourceAccessor(n,u)}addResource(t,e,i){var n,s;(n=this._uniformBindMap)[e]||(n[e]={}),(s=this._uniformBindMap[e])[i]||(s[i]=t),this.groups[e]||(this.groups[e]=new V,this._ownedBindGroups.push(this.groups[e]))}_buildResourceAccessor(t,e){const i={};for(const n in e){const s=e[n];Object.defineProperty(i,s.name,{get(){return t[s.group].getResource(s.binding)},set(o){t[s.group].setResource(o,s.binding)}})}return i}destroy(t=!1){var e,i;this.emit("destroy",this),t&&((e=this.gpuProgram)==null||e.destroy(),(i=this.glProgram)==null||i.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(n=>{n.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(t){const{gpu:e,gl:i,...n}=t;let s,o;return e&&(s=z.from(e)),i&&(o=gt.from(i)),new _t({gpuProgram:s,glProgram:o,...n})}}const qt={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},U=0,$=1,k=2,O=3,N=4,L=5,q=class yt{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<U)}set blend(t){!!(this.data&1<<U)!==t&&(this.data^=1<<U)}get offsets(){return!!(this.data&1<<$)}set offsets(t){!!(this.data&1<<$)!==t&&(this.data^=1<<$)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<k)}set culling(t){!!(this.data&1<<k)!==t&&(this.data^=1<<k)}get depthTest(){return!!(this.data&1<<O)}set depthTest(t){!!(this.data&1<<O)!==t&&(this.data^=1<<O)}get depthMask(){return!!(this.data&1<<L)}set depthMask(t){!!(this.data&1<<L)!==t&&(this.data^=1<<L)}get clockwiseFrontFace(){return!!(this.data&1<<N)}set clockwiseFrontFace(t){!!(this.data&1<<N)!==t&&(this.data^=1<<N)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=qt[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new yt;return t.depthTest=!1,t.blend=!0,t}};q.default2d=q.for2d();let Me=q;const Qt=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function Zt(r){let t="";for(let e=0;e<r;++e)e>0&&(t+=`
else `),e<r-1&&(t+=`if(test == ${e}.0){}`);return t}function Jt(r,t){if(r===0)throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");const e=t.createShader(t.FRAGMENT_SHADER);for(;;){const i=Qt.replace(/%forloop%/gi,Zt(r));if(t.shaderSource(e,i),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS))r=r/2|0;else break}return r}let P=null;function te(){if(P)return P;const r=mt();return P=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),P=Jt(P,r),P}class it{constructor(t){typeof t=="number"?this.rawBinaryData=new ArrayBuffer(t):t instanceof Uint8Array?this.rawBinaryData=t.buffer:this.rawBinaryData=t,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(t){return this[`${t}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(t){switch(t){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${t} isn't a valid view type`)}}}function nt(r,t){const e=r.byteLength/8|0,i=new Float64Array(r,0,e);new Float64Array(t,0,e).set(i);const s=r.byteLength-e*8;if(s>0){const o=new Uint8Array(r,e*8,s);new Uint8Array(t,e*8,s).set(o)}}const ee={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var re=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(re||{});function st(r,t){return t.alphaMode==="no-premultiply-alpha"&&ee[r]||r}class ie{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let t=0;t<this.count;t++){const e=this.textures[t];this.textures[t]=null,this.ids[e.uid]=null}this.count=0}}class ne{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.textures=new ie,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}const St=[];let Q=0;function ot(){return Q>0?St[--Q]:new ne}function at(r){St[Q++]=r}let A=0;const wt=class Pt{constructor(t={}){this.uid=S("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._vertexSize=6,this._elements=[],t={...Pt.defaultOptions,...t};const{vertexSize:e,indexSize:i}=t;this.attributeBuffer=new it(e*this._vertexSize*4),this.indexBuffer=new Uint16Array(i),this._maxTextures=te()}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let t=0;t<this.batchIndex;t++)at(this.batches[t]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(t){this._elements[this.elementSize++]=t,t.indexStart=this.indexSize,t.location=this.attributeSize,t.batcher=this,this.indexSize+=t.indexSize,this.attributeSize+=t.vertexSize*this._vertexSize}checkAndUpdateTexture(t,e){const i=t.batch.textures.ids[e._source.uid];return!i&&i!==0?!1:(t.textureId=i,t.texture=e,!0)}updateElement(t){this.dirty=!0,t.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,t.location,t.textureId)}break(t){const e=this._elements;if(!e[this.elementStart])return;let i=ot(),n=i.textures;n.clear();const s=e[this.elementStart];let o=st(s.blendMode,s.texture._source);this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const a=this.attributeBuffer.float32View,u=this.attributeBuffer.uint32View,f=this.indexBuffer;let c=this._batchIndexSize,l=this._batchIndexStart,m="startBatch";const h=this._maxTextures;for(let p=this.elementStart;p<this.elementSize;++p){const d=e[p];e[p]=null;const g=d.texture._source,b=st(d.blendMode,g),v=o!==b;if(g._batchTick===A&&!v){d.textureId=g._textureBindLocation,c+=d.indexSize,d.packAttributes(a,u,d.location,d.textureId),d.packIndex(f,d.indexStart,d.location/this._vertexSize),d.batch=i;continue}g._batchTick=A,(n.count>=h||v)&&(this._finishBatch(i,l,c-l,n,o,t,m),m="renderBatch",l=c,o=b,i=ot(),n=i.textures,n.clear(),++A),d.textureId=g._textureBindLocation=n.count,n.ids[g.uid]=n.count,n.textures[n.count++]=g,d.batch=i,c+=d.indexSize,d.packAttributes(a,u,d.location,d.textureId),d.packIndex(f,d.indexStart,d.location/this._vertexSize)}n.count>0&&(this._finishBatch(i,l,c-l,n,o,t,m),l=c,++A),this.elementStart=this.elementSize,this._batchIndexStart=l,this._batchIndexSize=c}_finishBatch(t,e,i,n,s,o,a){t.gpuBindGroup=null,t.bindGroup=null,t.action=a,t.batcher=this,t.textures=n,t.blendMode=s,t.start=e,t.size=i,++A,this.batches[this.batchIndex++]=t,o.add(t)}finish(t){this.break(t)}ensureAttributeBuffer(t){t*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(t*4)}ensureIndexBuffer(t){t<=this.indexBuffer.length||this._resizeIndexBuffer(t)}_resizeAttributeBuffer(t){const e=Math.max(t,this.attributeBuffer.size*2),i=new it(e);nt(this.attributeBuffer.rawBinaryData,i.rawBinaryData),this.attributeBuffer=i}_resizeIndexBuffer(t){const e=this.indexBuffer;let i=Math.max(t,e.length*1.5);i+=i%2;const n=i>65535?new Uint32Array(i):new Uint16Array(i);if(n.BYTES_PER_ELEMENT!==e.BYTES_PER_ELEMENT)for(let s=0;s<e.length;s++)n[s]=e[s];else nt(e.buffer,n.buffer);this.indexBuffer=n}destroy(){for(let t=0;t<this.batches.length;t++)at(this.batches[t]);this.batches=null;for(let t=0;t<this._elements.length;t++)this._elements[t].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}};wt.defaultOptions={vertexSize:4,indexSize:6};let ze=wt;var x=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))(x||{});class E extends Z{constructor(t){let{data:e,size:i}=t;const{usage:n,label:s,shrinkToFit:o}=t;super(),this.uid=S("buffer"),this._resourceType="buffer",this._resourceId=S("resource"),this._touched=0,this._updateID=1,this.shrinkToFit=!0,this.destroyed=!1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,i=i??(e==null?void 0:e.byteLength);const a=!!e;this.descriptor={size:i,usage:n,mappedAtCreation:a,label:s},this.shrinkToFit=o??!0}get data(){return this._data}set data(t){this.setDataWithSize(t,t.length,!0)}get static(){return!!(this.descriptor.usage&x.STATIC)}set static(t){t?this.descriptor.usage|=x.STATIC:this.descriptor.usage&=~x.STATIC}setDataWithSize(t,e,i){if(this._updateID++,this._updateSize=e*t.BYTES_PER_ELEMENT,this._data===t){i&&this.emit("update",this);return}const n=this._data;if(this._data=t,n.length!==t.length){!this.shrinkToFit&&t.byteLength<n.byteLength?i&&this.emit("update",this):(this.descriptor.size=t.byteLength,this._resourceId=S("resource"),this.emit("change",this));return}i&&this.emit("update",this)}update(t){this._updateSize=t??this._updateSize,this._updateID++,this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}function At(r,t){if(!(r instanceof E)){let e=t?x.INDEX:x.VERTEX;r instanceof Array&&(t?(r=new Uint32Array(r),e=x.INDEX|x.COPY_DST):(r=new Float32Array(r),e=x.VERTEX|x.COPY_DST)),r=new E({data:r,label:t?"index-mesh-buffer":"vertex-mesh-buffer",usage:e})}return r}function se(r,t,e){const i=r.getAttribute(t);if(!i)return e.minX=0,e.minY=0,e.maxX=0,e.maxY=0,e;const n=i.buffer.data;let s=1/0,o=1/0,a=-1/0,u=-1/0;const f=n.BYTES_PER_ELEMENT,c=(i.offset||0)/f,l=(i.stride||2*4)/f;for(let m=c;m<n.length;m+=l){const h=n[m],p=n[m+1];h>a&&(a=h),p>u&&(u=p),h<s&&(s=h),p<o&&(o=p)}return e.minX=s,e.minY=o,e.maxX=a,e.maxY=u,e}function oe(r){return(r instanceof E||Array.isArray(r)||r.BYTES_PER_ELEMENT)&&(r={buffer:r}),r.buffer=At(r.buffer,!1),r}class ae extends Z{constructor(t){const{attributes:e,indexBuffer:i,topology:n}=t;super(),this.uid=S("geometry"),this._layoutKey=0,this.instanceCount=1,this._bounds=new It,this._boundsDirty=!0,this.attributes=e,this.buffers=[],this.instanceCount=t.instanceCount||1;for(const s in e){const o=e[s]=oe(e[s]);this.buffers.indexOf(o.buffer)===-1&&(this.buffers.push(o.buffer),o.buffer.on("update",this.onBufferUpdate,this),o.buffer.on("change",this.onBufferUpdate,this))}i&&(this.indexBuffer=At(i,!0),this.buffers.push(this.indexBuffer)),this.topology=n||"triangle-list"}onBufferUpdate(){this._boundsDirty=!0,this.emit("update",this)}getAttribute(t){return this.attributes[t]}getIndex(){return this.indexBuffer}getBuffer(t){return this.getAttribute(t).buffer}getSize(){for(const t in this.attributes){const e=this.attributes[t];return e.buffer.data.length/(e.stride/4||e.size)}return 0}get bounds(){return this._boundsDirty?(this._boundsDirty=!1,se(this,"aPosition",this._bounds)):this._bounds}destroy(t=!1){this.emit("destroy",this),this.removeAllListeners(),t&&this.buffers.forEach(e=>e.destroy()),this.attributes=null,this.buffers=null,this.indexBuffer=null,this._bounds=null}}const ue=new Float32Array(1),ce=new Uint32Array(1);class Ce extends ae{constructor(){const e=new E({data:ue,label:"attribute-batch-buffer",usage:x.VERTEX|x.COPY_DST,shrinkToFit:!1}),i=new E({data:ce,label:"index-batch-buffer",usage:x.INDEX|x.COPY_DST,shrinkToFit:!1}),n=6*4;super({attributes:{aPosition:{buffer:e,format:"float32x2",stride:n,offset:0,location:1},aUV:{buffer:e,format:"float32x2",stride:n,offset:2*4,location:3},aColor:{buffer:e,format:"unorm8x4",stride:n,offset:4*4,location:0},aTextureIdAndRound:{buffer:e,format:"uint16x2",stride:n,offset:5*4,location:2}},indexBuffer:i})}}let le=0;class he{constructor(t){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1}createTexture(t,e,i){const n=new Mt({...this.textureOptions,width:t,height:e,resolution:1,antialias:i,autoGarbageCollect:!0});return new zt({source:n,label:`texturePool_${le++}`})}getOptimalTexture(t,e,i=1,n){let s=Math.ceil(t*i-1e-6),o=Math.ceil(e*i-1e-6);s=tt(s),o=tt(o);const a=(s<<17)+(o<<1)+(n?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let u=this._texturePool[a].pop();return u||(u=this.createTexture(s,o,n)),u.source._resolution=i,u.source.width=s/i,u.source.height=o/i,u.source.pixelWidth=s,u.source.pixelHeight=o,u.frame.x=0,u.frame.y=0,u.frame.width=t,u.frame.height=e,u.updateUvs(),this._poolKeyHash[u.uid]=a,u}getSameSizeTexture(t,e=!1){const i=t.source;return this.getOptimalTexture(t.width,t.height,i._resolution,e)}returnTexture(t){const e=this._poolKeyHash[t.uid];this._texturePool[e].push(t)}clear(t){if(t=t!==!1,t)for(const e in this._texturePool){const i=this._texturePool[e];if(i)for(let n=0;n<i.length;n++)i[n].destroy(!0)}this._texturePool={}}}const Re=new he;function ut(r,t,e){if(r)for(const i in r){const n=i.toLocaleLowerCase(),s=t[n];if(s){let o=r[i];i==="header"&&(o=o.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),e&&s.push(`//----${e}----//`),s.push(o)}else Ct(`${i} placement hook does not exist in shader`)}}const fe=/\{\{(.*?)\}\}/g;function ct(r){var i;const t={};return(((i=r.match(fe))==null?void 0:i.map(n=>n.replace(/[{()}]/g,"")))??[]).forEach(n=>{t[n]=[]}),t}function lt(r,t){let e;const i=/@in\s+([^;]+);/g;for(;(e=i.exec(r))!==null;)t.push(e[1])}function ht(r,t,e=!1){const i=[];lt(t,i),r.forEach(a=>{a.header&&lt(a.header,i)});const n=i;e&&n.sort();const s=n.map((a,u)=>`       @location(${u}) ${a},`).join(`
`);let o=t.replace(/@in\s+[^;]+;\s*/g,"");return o=o.replace("{{in}}",`
${s}
`),o}function ft(r,t){let e;const i=/@out\s+([^;]+);/g;for(;(e=i.exec(r))!==null;)t.push(e[1])}function de(r){const e=/\b(\w+)\s*:/g.exec(r);return e?e[1]:""}function me(r){const t=/@.*?\s+/g;return r.replace(t,"")}function pe(r,t){const e=[];ft(t,e),r.forEach(u=>{u.header&&ft(u.header,e)});let i=0;const n=e.sort().map(u=>u.indexOf("builtin")>-1?u:`@location(${i++}) ${u}`).join(`,
`),s=e.sort().map(u=>`       var ${me(u)};`).join(`
`),o=`return VSOutput(
                ${e.sort().map(u=>` ${de(u)}`).join(`,
`)});`;let a=t.replace(/@out\s+[^;]+;\s*/g,"");return a=a.replace("{{struct}}",`
${n}
`),a=a.replace("{{start}}",`
${s}
`),a=a.replace("{{return}}",`
${o}
`),a}function dt(r,t){let e=r;for(const i in t){const n=t[i];n.join(`
`).length?e=e.replace(`{{${i}}}`,`//-----${i} START-----//
${n.join(`
`)}
//----${i} FINISH----//`):e=e.replace(`{{${i}}}`,"")}return e}const y=Object.create(null),j=new Map;let ge=0;function xe({template:r,bits:t}){const e=Tt(r,t);if(y[e])return y[e];const{vertex:i,fragment:n}=be(r,t);return y[e]=Et(i,n,t),y[e]}function ve({template:r,bits:t}){const e=Tt(r,t);return y[e]||(y[e]=Et(r.vertex,r.fragment,t)),y[e]}function be(r,t){const e=t.map(o=>o.vertex).filter(o=>!!o),i=t.map(o=>o.fragment).filter(o=>!!o);let n=ht(e,r.vertex,!0);n=pe(e,n);const s=ht(i,r.fragment,!0);return{vertex:n,fragment:s}}function Tt(r,t){return t.map(e=>(j.has(e)||j.set(e,ge++),j.get(e))).sort((e,i)=>e-i).join("-")+r.vertex+r.fragment}function Et(r,t,e){const i=ct(r),n=ct(t);return e.forEach(s=>{ut(s.vertex,i,s.name),ut(s.fragment,n,s.name)}),{vertex:dt(r,i),fragment:dt(t,n)}}const _e=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,ye=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,Se=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,we=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,Pe={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},Ae={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function Ge({bits:r,name:t}){const e=xe({template:{fragment:ye,vertex:_e},bits:[Pe,...r]});return z.from({name:t,vertex:{source:e.vertex,entryPoint:"main"},fragment:{source:e.fragment,entryPoint:"main"}})}function De({bits:r,name:t}){return new gt({name:t,...ve({template:{vertex:Se,fragment:we},bits:[Ae,...r]})})}const Fe={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},Ve={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},H={};function Te(r){const t=[];if(r===1)t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),t.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let e=0;for(let i=0;i<r;i++)t.push(`@group(1) @binding(${e++}) var textureSource${i+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${i+1}: sampler;`)}return t.join(`
`)}function Ee(r){const t=[];if(r===1)t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{t.push("switch vTextureId {");for(let e=0;e<r;e++)e===r-1?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");t.push("}")}return t.join(`
`)}function Ue(r){return H[r]||(H[r]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${Te(r)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${Ee(r)}
            `}}),H[r]}const Y={};function Be(r){const t=[];for(let e=0;e<r;e++)e>0&&t.push("else"),e<r-1&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join(`
`)}function $e(r){return Y[r]||(Y[r]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${r}];

            `,main:`

                ${Be(r)}
            `}}),Y[r]}const ke={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},Oe={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},W={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},Ne={...W,vertex:{...W.vertex,header:W.vertex.header.replace("group(1)","group(2)")}},Le={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class je{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(t,e,i,n){const s=this.renderable,o=this.texture,a=s.groupTransform,u=a.a,f=a.b,c=a.c,l=a.d,m=a.tx,h=a.ty,p=this.bounds,d=p.maxX,_=p.minX,g=p.maxY,b=p.minY,v=o.uvs,B=s.groupColorAlpha,I=n<<16|this.roundPixels&65535;t[i+0]=u*_+c*b+m,t[i+1]=l*b+f*_+h,t[i+2]=v.x0,t[i+3]=v.y0,e[i+4]=B,e[i+5]=I,t[i+6]=u*d+c*b+m,t[i+7]=l*b+f*d+h,t[i+8]=v.x1,t[i+9]=v.y1,e[i+10]=B,e[i+11]=I,t[i+12]=u*d+c*g+m,t[i+13]=l*g+f*d+h,t[i+14]=v.x2,t[i+15]=v.y2,e[i+16]=B,e[i+17]=I,t[i+18]=u*_+c*g+m,t[i+19]=l*g+f*_+h,t[i+20]=v.x3,t[i+21]=v.y3,e[i+22]=B,e[i+23]=I}packIndex(t,e,i){t[e]=i+0,t[e+1]=i+1,t[e+2]=i+2,t[e+3]=i+0,t[e+4]=i+2,t[e+5]=i+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}function He(r,t,e){const i=(r>>24&255)/255;t[e++]=(r&255)/255*i,t[e++]=(r>>8&255)/255*i,t[e++]=(r>>16&255)/255*i,t[e++]=i}export{V as B,z as G,K as R,Me as S,Re as T,Kt as U,Fe as a,Ue as b,Ge as c,_t as d,re as e,nt as f,te as g,x as h,E as i,J as j,W as k,Ne as l,gt as m,ze as n,Ce as o,Ot as p,je as q,ke as r,He as s,De as t,Ve as u,$e as v,Oe as w,ae as x,Le as y,st as z};
