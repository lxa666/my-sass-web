(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-stats-bankCard"],{"0634":function(t,e,r){"use strict";r.r(e);var n=r("da7d"),i=r("bf5c");for(var a in i)"default"!==a&&function(t){r.d(e,t,(function(){return i[t]}))}(a);var o,c=r("f0c5"),u=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"4ca918ac",null,!1,n["a"],o);e["default"]=u.exports},"1da1":function(t,e,r){"use strict";function n(t,e,r,n,i,a,o){try{var c=t[a](o),u=c.value}catch(s){return void r(s)}c.done?e(u):Promise.resolve(u).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,a){var o=t.apply(e,r);function c(t){n(o,i,a,c,u,"next",t)}function u(t){n(o,i,a,c,u,"throw",t)}c(void 0)}))}}r("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},"96cf":function(t,e){!function(e){"use strict";var r,n=Object.prototype,i=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag",s="object"===typeof t,l=e.regeneratorRuntime;if(l)s&&(t.exports=l);else{l=e.regeneratorRuntime=s?t.exports:{},l.wrap=b;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",v={},y={};y[o]=function(){return this};var m=Object.getPrototypeOf,g=m&&m(m(O([])));g&&g!==n&&i.call(g,o)&&(y=g);var w=k.prototype=L.prototype=Object.create(y);_.prototype=w.constructor=k,k.constructor=_,k[u]=_.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},l.awrap=function(t){return{__await:t}},C(E.prototype),E.prototype[c]=function(){return this},l.AsyncIterator=E,l.async=function(t,e,r,n){var i=new E(b(t,e,r,n));return l.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},C(w),w[u]="Generator",w[o]=function(){return this},w.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,i){return c.type="throw",c.arg=t,e.next=n,i&&(e.method="next",e.arg=r),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var u=i.call(o,"catchLoc"),s=i.call(o,"finallyLoc");if(u&&s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;I(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:O(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),v}}}function b(t,e,r,n){var i=e&&e.prototype instanceof L?e:L,a=Object.create(i.prototype),o=new j(n||[]);return a._invoke=S(t,r,o),a}function x(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function L(){}function _(){}function k(){}function C(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function E(t){function e(r,n,a,o){var c=x(t[r],t,n);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"===typeof s&&i.call(s,"__await")?Promise.resolve(s.__await).then((function(t){e("next",t,a,o)}),(function(t){e("throw",t,a,o)})):Promise.resolve(s).then((function(t){u.value=t,a(u)}),(function(t){return e("throw",t,a,o)}))}o(c.arg)}var r;function n(t,n){function i(){return new Promise((function(r,i){e(t,n,r,i)}))}return r=r?r.then(i,i):i()}this._invoke=n}function S(t,e,r){var n=f;return function(i,a){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw a;return R()}r.method=i,r.arg=a;while(1){var o=r.delegate;if(o){var c=P(o,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var u=x(t,e,r);if("normal"===u.type){if(n=r.done?p:h,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=p,r.method="throw",r.arg=u.arg)}}}function P(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,P(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=x(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,v;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,v):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function F(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(F,this),this.reset(!0)}function O(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){while(++n<t.length)if(i.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:R}}function R(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},ad88:function(t,e,r){"use strict";function n(t,e){var r=t.split(","),n=r[0].match(/:(.*?);/)[1],i=atob(r[1]),a=i.length,o=new Uint8Array(a);while(a--)o[a]=i.charCodeAt(a);return new File([o],e,{type:n})}function i(t,e){var r,i=parseFloat(parseInt(t["size"])/1024/1024).toFixed(2),a=new FileReader;return a.readAsDataURL(t),new Promise((function(o,c){a.onload=function(a){console.log("eeeee",a);var c=new Image;c.src=a.target.result,c.onload=function(){var a,c=this.width,u=this.height,s=document.createElement("canvas"),l=s.getContext("2d");s.setAttribute("width",c),s.setAttribute("height",u),l.drawImage(this,0,0,c,u),a=i<1?s.toDataURL(t["type"],1):i>1&&i<2?s.toDataURL(t["type"],.5):s.toDataURL(t["type"],.2),r=n(a,e),r=window.URL.createObjectURL(r),console.log(r),o(r)}}}))}r("ace4"),r("b680"),r("d3b7"),r("acd8"),r("e25e"),r("ac1f"),r("3ca3"),r("466d"),r("1276"),r("5cc6"),r("9a8c"),r("a975"),r("735e"),r("c1ac"),r("d139"),r("3a7b"),r("d5d6"),r("82f8"),r("e91f"),r("60bd"),r("5f96"),r("3280"),r("3fcc"),r("ca91"),r("25a1"),r("cd26"),r("3c5d"),r("2954"),r("649e"),r("219c"),r("170b"),r("b39a"),r("72f7"),r("ddb0"),r("2b3d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={compressImg:i};e.default=a},bf5c:function(t,e,r){"use strict";r.r(e);var n=r("c2ca"),i=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},c2ca:function(t,e,r){"use strict";var n=r("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r("96cf");var i=n(r("1da1")),a=r("282b"),o=n(r("ad88")),c={data:function(){return{bankCardId:"",mobile:"",bankCardPic:"",bankCardPic_URL:""}},methods:{ChooseImage:function(t){var e=this;uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(){var r=(0,i.default)(regeneratorRuntime.mark((function r(n){var i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return uni.showLoading({title:"文件上传中..."}),r.next=3,o.default.compressImg(n.tempFiles[0],n.tempFiles[0].name);case 3:i=r.sent,e[t]="",e["".concat(t,"_URL")]=i,uni.uploadFile({url:a.SERVER_URL_IMG+"?fileName="+n.tempFiles[0].name,header:{"Blade-Auth":"bearer ".concat(uni.getStorageSync("access_token"))},filePath:i,name:"file",formData:{},success:function(r){uni.hideLoading();var n=JSON.parse(r.data);e[t]=n.data.name}});case 7:case"end":return r.stop()}}),r)})));function n(t){return r.apply(this,arguments)}return n}()})},submit:function(){if(this.bankCardId&&this.mobile&&this.bankCardPic){var t=uni.getStorageSync("idCardData");this.api.postsalarysubmit({data:{certPoSide:t.imageVal1,certNeSide:t.imageVal2,certName:t.userName,certNo:t.userId,bankCardNo:this.bankCardId,preMobile:this.mobile,bankCardPic:this.bankCardPic},success:function(t){200==t.data.code&&uni.navigateTo({url:"/pages/stats/review"})}})}else uni.showModal({title:"温馨提示",content:"请完善所有资料后再提交",showCancel:!1,success:function(t){}})}}};e.default=c},da7d:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",[r("v-uni-view",{staticStyle:{color:"#0081FF","font-size":"28rpx",padding:"12rpx 24rpx"}},[r("v-uni-text",{staticClass:"cuIcon-info",staticStyle:{"padding-right":"12rpx"}}),t._v("请绑定本人身份信息，若填写错误将导致无法成功打款")],1),r("v-uni-view",[r("v-uni-view",[r("v-uni-view",{staticClass:"cu-form-group"},[r("v-uni-view",{staticClass:"title"},[t._v("银行卡卡号")]),r("v-uni-input",{attrs:{type:"number",placeholder:""},model:{value:t.bankCardId,callback:function(e){t.bankCardId=e},expression:"bankCardId"}})],1),r("v-uni-view",{staticClass:"cu-form-group"},[r("v-uni-view",{staticClass:"title"},[t._v("银行卡预留手机号")]),r("v-uni-input",{attrs:{type:"number",placeholder:""},model:{value:t.mobile,callback:function(e){t.mobile=e},expression:"mobile"}})],1)],1)],1),r("v-uni-view",{staticClass:"margin-top",staticStyle:{"text-align":"center"}},[r("v-uni-view",[r("v-uni-view",[r("v-uni-view",{staticClass:"margin-top",staticStyle:{display:"flex","align-items":"center","justify-content":"center",position:"relative"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage("bankCardPic")}}},[t.bankCardPic?r("v-uni-image",{staticStyle:{width:"702rpx",height:"348rpx","border-radius":"10rpx"},attrs:{src:t.bankCardPic_URL}}):r("v-uni-view",{staticStyle:{width:"702rpx",height:"348rpx","border-radius":"10rpx","background-color":"#6a93ff"}}),r("v-uni-view",{staticStyle:{position:"absolute"}},[r("v-uni-view",{staticClass:"cuIcon-add",staticStyle:{margin:"auto",color:"#FFF","font-size":"3em"}}),r("v-uni-view",{staticStyle:{color:"#FFF","font-size":"32rpx"}},[t._v("点击上传银行卡正面")])],1)],1)],1)],1)],1),r("v-uni-view",{staticStyle:{padding:"24rpx"}},[r("v-uni-button",{staticClass:"cu-btn block bg-blue margin-tb-sm lg",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("确认绑定")]),r("v-uni-view",{staticStyle:{color:"#a6a6a6","font-size":"24rpx","margin-top":"12rpx","text-align":"center"}},[t._v("本操作将严格保护您的隐私安全，请放心操作")])],1)],1)},a=[]}}]);