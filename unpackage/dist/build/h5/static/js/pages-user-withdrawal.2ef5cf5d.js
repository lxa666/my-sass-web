(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-withdrawal"],{"2db0":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{tradeMoney:""}},methods:{postcashout:function(){this.api.postcashout({data:{tradeMoney:this.tradeMoney},success:function(t){console.log(t)}})}}};n.default=a},3379:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticStyle:{padding:"24rpx"}},[e("v-uni-view",{staticClass:"cu-bar bg-white solid-bottom bg-gradual-blue radius"},[e("v-uni-view",{staticClass:"action"},[t._v("您的余额：0.00元")])],1),e("v-uni-view",[e("v-uni-view",{staticClass:"margin-top cu-form-group  radius"},[e("v-uni-view",{staticClass:"title"},[t._v("提现金额")]),e("v-uni-input",{attrs:{placeholder:"输入提现金额",type:"number",name:"input"},model:{value:t.tradeMoney,callback:function(n){t.tradeMoney=n},expression:"tradeMoney"}})],1)],1),e("v-uni-button",{staticClass:"cu-btn block bg-green margin-tb-sm lg",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.postcashout.apply(void 0,arguments)}}},[t._v("提交")]),e("v-uni-view",{staticClass:"margin-top",staticStyle:{"line-height":"60rpx","font-size":"1em",padding:"24rpx"}},[e("v-uni-view",{staticStyle:{color:"#e54d42"}},[e("p",[t._v("1、支付宝姓名和账户不匹配将无法到账")]),e("p",[t._v("2、提款手续费1%，最低收取手续费1元")]),e("p",[t._v("3、单笔最低申请提款金额为10元")])])],1)],1)},u=[]},"61ae":function(t,n,e){"use strict";e.r(n);var a=e("3379"),i=e("c9a4");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);var o,r=e("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"f58ce316",null,!1,a["a"],o);n["default"]=c.exports},c9a4:function(t,n,e){"use strict";e.r(n);var a=e("2db0"),i=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=i.a}}]);