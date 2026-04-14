(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();/**
* @vue/shared v3.4.23
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
* @vue/reactivity v3.4.23
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Pe;class ai{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Pe,!t&&Pe&&(this.index=(Pe.scopes||(Pe.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=Pe;try{return Pe=this,t()}finally{Pe=n}}}on(){Pe=this}off(){Pe=this.parent}stop(t){if(this._active){let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.scopes)for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function ci(e,t=Pe){t&&t.active&&t.effects.push(e)}function ui(){return Pe}let gt;class ws{constructor(t,n,s,o){this.fn=t,this.trigger=n,this.scheduler=s,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ci(this,o)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,lt();for(let t=0;t<this._depsLength;t++){const n=this.deps[t];if(n.computed&&(fi(n.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),at()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=st,n=gt;try{return st=!0,gt=this,this._runnings++,js(this),this.fn()}finally{Hs(this),this._runnings--,gt=n,st=t}}stop(){var t;this.active&&(js(this),Hs(this),(t=this.onStop)==null||t.call(this),this.active=!1)}}function fi(e){return e.value}function js(e){e._trackId++,e._depsLength=0}function Hs(e){if(e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)Wo(e.deps[t],e);e.deps.length=e._depsLength}}function Wo(e,t){const n=e.get(t);n!==void 0&&t._trackId!==n&&(e.delete(t),e.size===0&&e.cleanup())}let st=!0,ts=0;const qo=[];function lt(){qo.push(st),st=!1}function at(){const e=qo.pop();st=e===void 0?!0:e}function xs(){ts++}function Es(){for(ts--;!ts&&ns.length;)ns.shift()()}function zo(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const s=e.deps[e._depsLength];s!==t?(s&&Wo(s,e),e.deps[e._depsLength++]=t):e._depsLength++}}const ns=[];function Go(e,t,n){xs();for(const s of e.keys()){let o;s._dirtyLevel<t&&(o??(o=e.get(s)===s._trackId))&&(s._shouldSchedule||(s._shouldSchedule=s._dirtyLevel===0),s._dirtyLevel=t),s._shouldSchedule&&(o??(o=e.get(s)===s._trackId))&&(s.trigger(),(!s._runnings||s.allowRecurse)&&s._dirtyLevel!==2&&(s._shouldSchedule=!1,s.scheduler&&ns.push(s.scheduler)))}Es()}const Qo=(e,t)=>{const n=new Map;return n.cleanup=e,n.computed=t,n},ss=new WeakMap,mt=Symbol(""),os=Symbol("");function xe(e,t,n){if(st&&gt){let s=ss.get(e);s||ss.set(e,s=new Map);let o=s.get(n);o||s.set(n,o=Qo(()=>s.delete(n))),zo(gt,o)}}function qe(e,t,n,s,o,r){const i=ss.get(e);if(!i)return;let a=[];if(t==="clear")a=[...i.values()];else if(n==="length"&&M(e)){const l=Number(s);i.forEach((d,u)=>{(u==="length"||!vt(u)&&u>=l)&&a.push(d)})}else switch(n!==void 0&&a.push(i.get(n)),t){case"add":M(e)?bs(n)&&a.push(i.get("length")):(a.push(i.get(mt)),Ct(e)&&a.push(i.get(os)));break;case"delete":M(e)||(a.push(i.get(mt)),Ct(e)&&a.push(i.get(os)));break;case"set":Ct(e)&&a.push(i.get(mt));break}xs();for(const l of a)l&&Go(l,4);Es()}const di=ms("__proto__,__v_isRef,__isVue"),Xo=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(vt)),Vs=hi();function hi(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const s=Q(this);for(let r=0,i=this.length;r<i;r++)xe(s,"get",r+"");const o=s[t](...n);return o===-1||o===!1?s[t](...n.map(Q)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){lt(),xs();const s=Q(this)[t].apply(this,n);return Es(),at(),s}}),e}function pi(e){vt(e)||(e=String(e));const t=Q(this);return xe(t,"has",e),t.hasOwnProperty(e)}class Yo{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,s){const o=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!o;if(n==="__v_isReadonly")return o;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(o?r?Ai:tr:r?er:Zo).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const i=M(t);if(!o){if(i&&z(Vs,n))return Reflect.get(Vs,n,s);if(n==="hasOwnProperty")return pi}const a=Reflect.get(t,n,s);return(vt(n)?Xo.has(n):di(n))||(o||xe(t,"get",n),r)?a:Ee(a)?i&&bs(n)?a:a.value:se(a)?o?sr(a):Tn(a):a}}class Jo extends Yo{constructor(t=!1){super(!1,t)}set(t,n,s,o){let r=t[n];if(!this._isShallow){const l=Gt(r);if(!_n(s)&&!Gt(s)&&(r=Q(r),s=Q(s)),!M(t)&&Ee(r)&&!Ee(s))return l?!1:(r.value=s,!0)}const i=M(t)&&bs(n)?Number(n)<t.length:z(t,n),a=Reflect.set(t,n,s,o);return t===Q(o)&&(i?rt(s,r)&&qe(t,"set",n,s):qe(t,"add",n,s)),a}deleteProperty(t,n){const s=z(t,n);t[n];const o=Reflect.deleteProperty(t,n);return o&&s&&qe(t,"delete",n,void 0),o}has(t,n){const s=Reflect.has(t,n);return(!vt(n)||!Xo.has(n))&&xe(t,"has",n),s}ownKeys(t){return xe(t,"iterate",M(t)?"length":mt),Reflect.ownKeys(t)}}class gi extends Yo{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const mi=new Jo,_i=new gi,vi=new Jo(!0),Ss=e=>e,An=e=>Reflect.getPrototypeOf(e);function sn(e,t,n=!1,s=!1){e=e.__v_raw;const o=Q(e),r=Q(t);n||(rt(t,r)&&xe(o,"get",t),xe(o,"get",r));const{has:i}=An(o),a=s?Ss:n?As:Qt;if(i.call(o,t))return a(e.get(t));if(i.call(o,r))return a(e.get(r));e!==o&&e.get(t)}function on(e,t=!1){const n=this.__v_raw,s=Q(n),o=Q(e);return t||(rt(e,o)&&xe(s,"has",e),xe(s,"has",o)),e===o?n.has(e):n.has(e)||n.has(o)}function rn(e,t=!1){return e=e.__v_raw,!t&&xe(Q(e),"iterate",mt),Reflect.get(e,"size",e)}function Ks(e){e=Q(e);const t=Q(this);return An(t).has.call(t,e)||(t.add(e),qe(t,"add",e,e)),this}function Ws(e,t){t=Q(t);const n=Q(this),{has:s,get:o}=An(n);let r=s.call(n,e);r||(e=Q(e),r=s.call(n,e));const i=o.call(n,e);return n.set(e,t),r?rt(t,i)&&qe(n,"set",e,t):qe(n,"add",e,t),this}function qs(e){const t=Q(this),{has:n,get:s}=An(t);let o=n.call(t,e);o||(e=Q(e),o=n.call(t,e)),s&&s.call(t,e);const r=t.delete(e);return o&&qe(t,"delete",e,void 0),r}function zs(){const e=Q(this),t=e.size!==0,n=e.clear();return t&&qe(e,"clear",void 0,void 0),n}function ln(e,t){return function(s,o){const r=this,i=r.__v_raw,a=Q(i),l=t?Ss:e?As:Qt;return!e&&xe(a,"iterate",mt),i.forEach((d,u)=>s.call(o,l(d),l(u),r))}}function an(e,t,n){return function(...s){const o=this.__v_raw,r=Q(o),i=Ct(r),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,d=o[e](...s),u=n?Ss:t?As:Qt;return!t&&xe(r,"iterate",l?os:mt),{next(){const{value:g,done:h}=d.next();return h?{value:g,done:h}:{value:a?[u(g[0]),u(g[1])]:u(g),done:h}},[Symbol.iterator](){return this}}}}function Ye(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function bi(){const e={get(r){return sn(this,r)},get size(){return rn(this)},has:on,add:Ks,set:Ws,delete:qs,clear:zs,forEach:ln(!1,!1)},t={get(r){return sn(this,r,!1,!0)},get size(){return rn(this)},has:on,add:Ks,set:Ws,delete:qs,clear:zs,forEach:ln(!1,!0)},n={get(r){return sn(this,r,!0)},get size(){return rn(this,!0)},has(r){return on.call(this,r,!0)},add:Ye("add"),set:Ye("set"),delete:Ye("delete"),clear:Ye("clear"),forEach:ln(!0,!1)},s={get(r){return sn(this,r,!0,!0)},get size(){return rn(this,!0)},has(r){return on.call(this,r,!0)},add:Ye("add"),set:Ye("set"),delete:Ye("delete"),clear:Ye("clear"),forEach:ln(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{e[r]=an(r,!1,!1),n[r]=an(r,!0,!1),t[r]=an(r,!1,!0),s[r]=an(r,!0,!0)}),[e,n,t,s]}const[yi,wi,xi,Ei]=bi();function Rs(e,t){const n=t?e?Ei:xi:e?wi:yi;return(s,o,r)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?s:Reflect.get(z(n,o)&&o in s?n:s,o,r)}const Si={get:Rs(!1,!1)},Ri={get:Rs(!1,!0)},Ci={get:Rs(!0,!1)},Zo=new WeakMap,er=new WeakMap,tr=new WeakMap,Ai=new WeakMap;function Ti(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Pi(e){return e.__v_skip||!Object.isExtensible(e)?0:Ti(Zr(e))}function Tn(e){return Gt(e)?e:Cs(e,!1,mi,Si,Zo)}function nr(e){return Cs(e,!1,vi,Ri,er)}function sr(e){return Cs(e,!0,_i,Ci,tr)}function Cs(e,t,n,s,o){if(!se(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const r=o.get(e);if(r)return r;const i=Pi(e);if(i===0)return e;const a=new Proxy(e,i===2?s:n);return o.set(e,a),a}function Bt(e){return Gt(e)?Bt(e.__v_raw):!!(e&&e.__v_isReactive)}function Gt(e){return!!(e&&e.__v_isReadonly)}function _n(e){return!!(e&&e.__v_isShallow)}function or(e){return e?!!e.__v_raw:!1}function Q(e){const t=e&&e.__v_raw;return t?Q(t):e}function Ii(e){return Object.isExtensible(e)&&jo(e,"__v_skip",!0),e}const Qt=e=>se(e)?Tn(e):e,As=e=>se(e)?sr(e):e;class rr{constructor(t,n,s,o){this.getter=t,this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new ws(()=>t(this._value),()=>fn(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=s}get value(){const t=Q(this);return(!t._cacheable||t.effect.dirty)&&rt(t._value,t._value=t.effect.run())&&fn(t,4),ir(t),t.effect._dirtyLevel>=2&&fn(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Oi(e,t,n=!1){let s,o;const r=B(e);return r?(s=e,o=Ae):(s=e.get,o=e.set),new rr(s,o,r||!o,n)}function ir(e){var t;st&&gt&&(e=Q(e),zo(gt,(t=e.dep)!=null?t:e.dep=Qo(()=>e.dep=void 0,e instanceof rr?e:void 0)))}function fn(e,t=4,n){e=Q(e);const s=e.dep;s&&Go(s,t)}function Ee(e){return!!(e&&e.__v_isRef===!0)}function _t(e){return lr(e,!1)}function Fi(e){return lr(e,!0)}function lr(e,t){return Ee(e)?e:new $i(e,t)}class $i{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:Q(t),this._value=n?t:Qt(t)}get value(){return ir(this),this._value}set value(t){const n=this.__v_isShallow||_n(t)||Gt(t);t=n?t:Q(t),rt(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:Qt(t),fn(this,4))}}function V(e){return Ee(e)?e.value:e}const ki={get:(e,t,n)=>V(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const o=e[t];return Ee(o)&&!Ee(n)?(o.value=n,!0):Reflect.set(e,t,n,s)}};function ar(e){return Bt(e)?e:new Proxy(e,ki)}/**
* @vue/runtime-core v3.4.23
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
* @vue/runtime-dom v3.4.23
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
        meta:
                description = "Use to detect Diaoyu Loader."
                author = "Phatcharadol Thangplub"
                date = "02-22-2026"

        strings:
                $s1 = "DiaoYu.exe" fullword wide
                $s2 = "05343A1E2A3B3B212C201505463E3503051C" fullword ascii
                $s3 = "urlmon.dll" fullword ascii
                $s4 = "avp.exe" fullword ascii
                $s5 = "SentryEye.exe" fullword ascii
                $s6 = "EPSecurityService.exe" fullword ascii
                $s7 = "SentinelUI.exe" fullword ascii
                $s8 = "NortonSecurity.exe" fullword ascii
                
                
                $hex1 = { 4? 33 ed 4? 89 7c [2] 4? 63 f5 85 ed 7e ?? 4? 89 74 [2] 4? 89 
                        7c [2] 4? 8b fd 90 4? 0f be 0c 7c 4? 0f be 7c 7c 01 e8 [4] 2c 
                        30 8b cf 0f b6 f0 e8 [4] 2c 30 4? 0f b6 c0 4? 80 fe 09 8d 46 
                        f9 0f b6 d0 0f 4e d6 c0 e2 04 4? 8d 40 f9 4? 80 f8 09 0f b6 
                        c8 4? 0f 4e c8 02 d1 4? 88 14 1f 4? ff c7 4? 3b fe 7c ?? 4? 
                        8b 7c [2] 4? 8b 74 [2] 4? 8b 64 [2] 4? 8d 15 [4] 85 ed 0f 8e [4] 
                        83 fd 40 0f 82 [4] 8d 45 ff 4? 63 c8 4? 8d 04 ?? 4? 8d 04 19 
                        4? 3b d8 77 ?? 4? 3b c2 0f 83 [4] 8b cd 81 e1 3f 00 00 80 7d 
                        ?? ff c9 83 c9 c0 ff c1 8b c5 4? 8d 05 [4] 2b c1 4? 8b fa 4? 
                        8b ca 4? 63 d8 4? 2b fb 4? 8d 4b 20 4? 2b c3 4? 2b cb 4? c7 
                        c2 e0 ff ff ff 4? 2b d3 66 90 f3 0f 6f 41 e0 4? 83 c5 40 f3 
                        0f 6f 4c 0f e0 f3 4? 0f 6f 14 09 4? 8d 49 40 66 0f ef c8 4? 
                        8d 04 0a f3 0f 7f 49 a0 f3 0f 6f 41 b0 f3 4? 0f 6f 4c 08 a0 
                        66 0f ef c8 f3 0f 7f 49 b0 f3 0f 6f 41 c0 f3 4? 0f 6f 4c 08 
                        c0 66 0f ef d0 f3 0f 7f 51 c0 f3 0f 6f 41 d0 66 0f ef c8 f3 
                        0f 7f 49 d0 4? 3b c3 7c ?? 4? 8b 7c [2] 4? 63 c5 4? 8b 6c [2] 
                        4? 3b c6 7d ?? 4? 2b d3 4? 8d 0c 18 4? 2b f0 90 0f b6 04 11 
                        30 01 4? 8d 49 01 4? 83 ee 01 75 ?? 4? 8b 74 [2] 4? 63 c5 4? 
                        8b 6c [2] 4? ff c8 4? 85 c0 7e ?? 4? 8b c3 4? 8d 14 18 4? f7 
                        d8 90 0f b6 02 4? 8d 52 ff 0f b6 0b 88 03 4? 8d 5b 01 88 4a 
                        01 4? 8d 04 02 4? 8d 0c 03 4? 3b c8 7c }

                
                $hex2 = { 4? 8d 41 05 ff c1 83 e0 1f 4? 8d 52 01 4? 0f b6 04 ?? 30 42 ff 4? 63 c1 4? 3b c7 72 }

        condition:
                uint16(0) == 0x5A4D and filesize >= 100KB and filesize <= 150KB and 
                (($s1 or ($s2 and $s3)) and ($s4 or $s5 or $s6 or $s7 or $s8) and ($hex1 or $hex2))
}`)],-1),md=m("pre",null,[m("code",null,`title: Diaoyu Loader – Dynamically resolving Windows API.
name: dynamically_resolving_windows_api
id: 46b41a5d-28ed-4969-b74f-3c7e07dcc0fe
status: experimental
description: Use to hunt Diaoyu Loader dynamically resolving Windows API.
references:
author: Phatcharadol Thangplub
date: 2026-02-26
modified: 2026-03-07
tags:
        - attack.T1027.007
logsource:
        product: windows
        service: sysmon
detection:
        selection_loaded_image:
                EventCode: 7
                ImageLoaded|endswith:
                        - "urlmon.dll"
        condition: selection_loaded_image
falsepositives:
        - Unknown
level: high
---
title: Diaoyu Loader – Download Cobalt Strike beacon.
name: download_cobalt_strike_beacon
id: 68782286-e349-4a02-8d88-f4c9052f6fd2
status: experimental
description: Use to hunt Diaoyu Loader download Cobalt Strike beacon.
references:
author: Phatcharadol Thangplub
date: 2026-02-22
modified: 2026-03-07
tags:
        - attack.T1105
logsource:
        product: windows
        service: sysmon
detection:
        selection_dns_query:
                EventCode: 22
                QueryName|startswith:
                        - "raw.githubusercontent.com"
        condition: selection_dns_query
falsepositives:
        - Unknown
level: high
---
title: Diaoyu Loader – Create Cobalt Strike beacon.
name: create_cobalt_strike_beacon
id: c4f89e97-8b44-49c6-bb25-9beea66210a5
status: experimental
description: Use to hunt Diaoyu Loader create Cobalt Strike beacon.
references:
author: Phatcharadol Thangplub
date: 2026-02-22
modified: 2026-03-07
tags:
        - attack.T1105
logsource:
        product: windows
        service: sysmon
detection:
        selection_file_creation:
                EventCode: 11
                TargetFilename|contains:
                        - "C:\\\\Users\\\\*\\\\Links\\\\*.docx"
                        - "C:\\\\Users\\\\*\\\\Videos\\\\*.exe"
                        - "C:\\\\Users\\\\*\\\\Videos\\\\*.dll"
        condition: selection_file_creation
falsepositives:
        - Unknown
level: high
---
title: Diaoyu Loader – Correlate Beacon Download and Creation.
id: 4e1e4519-4eed-4140-8edc-dc6923f11c10
correlation:
        type: temporal
        rules:
                - dynamically_resolving_windows_api
                - download_cobalt_strike_beacon
                - create_cobalt_strike_beacon
        group-by:
                - Computer
                - User
                - ProcessId
                - Image
