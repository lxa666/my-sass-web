(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-open-reg"],{"19e6":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".form-item[data-v-16d10c24]{margin-bottom:%?20?%;border-radius:%?50?%}",""]),t.exports=e},"23b5":function(t,e,i){"use strict";var n=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("2909")),o=n(i("5530")),s=n(i("b1c2")),r=i("943f"),c=n(i("31be")),l=i("2f62"),u={components:{CodeTime:c.default},data:function(){return{address:r.address,inviter:"",mobile:"",codeUrl:"",codeKey:"",codeVal:"",regionlist:[],index:0,provinceIndex:0,cityIndex:0,districtIndex:0,provinceName:"",cityName:"",districtName:"",errall:{username:"姓名",mobile:"手机号",smscode:"验证码",password:"密码",password1:"确认密码"}}},computed:(0,o.default)({},(0,l.mapState)({loading:function(t){return t.publicStore.loading}})),created:function(){},beforeDestroy:function(){},onLoad:function(t){t.inviter?(uni.setStorageSync("inviter",t.inviter),this.inviter=t.inviter):this.inviter=uni.getStorageSync("inviter")||""},onShow:function(){console.log("address",r.address),this.regionlist.length||(this.regionlist=(0,a.default)(this.address))},methods:{topage:function(t){uni.navigateTo({url:t})},formSubmit:function(t){var e=this,i=t.detail.value;i.tenantId=this.tenantId,console.log(i,this.provinceName,this.cityName),this.inviter&&(uni.setStorageSync("inviter",this.inviter),i.promocode=this.inviter);var n=!1;for(var a in i)i[a]||"promocode"===a||(n=a);if(n)uni.showModal({title:"提交失败",content:"".concat(this.errall[n],"不可为空"),showCancel:!1,success:function(t){}});else{if(i.password!=i.password1)return void uni.showModal({title:"提交失败",content:"两次输入的密码不一致",showCancel:!1});if(!this.provinceName||!this.cityName||"请选择城市"==this.cityName)return void uni.showModal({title:"提交失败",content:"请选择省份/城市",showCancel:!1});this.api.postregist({header:{Authorization:"Basic ".concat(s.default.encode("miniapp:miniapp_secret")),"Captcha-Code":this.codeVal,"Captcha-Key":this.codeKey},data:(0,o.default)((0,o.default)({},i),{},{region:"".concat(this.provinceName,"-").concat(this.cityName)}),success:function(t){200==t.data.code?e.topage("/pages/open/code"):console.log("数据异常")}})}},formReset:function(t){console.log("清空数据")},provinceNameChange:function(t){this.provinceIndex=t.detail.value,this.provinceName=this.regionlist[t.detail.value].provinceName;var e={cityName:"请选择城市",children:[{districtName:"请选择地区"}]};"请选择城市"!=this.regionlist[this.provinceIndex].children[0].cityName&&this.regionlist[this.provinceIndex].children.unshift(e),this.cityIndex=0,this.cityName="",this.districtIndex=0,this.districtName=""},cityNameChange:function(t){this.cityIndex=t.detail.value;var e=this.regionlist[this.provinceIndex].children[t.detail.value];this.cityName=e.cityName,"请选择地区"!=e.children[0].districtName&&e.children.unshift({districtName:"请选择地区"}),this.districtIndex=0,this.districtName=""},districtNameChange:function(t){this.districtIndex=t.detail.value,this.districtName=this.regionlist[this.provinceIndex].children[this.cityIndex].children[t.detail.value].districtName}}};e.default=u},"6a45":function(t,e,i){"use strict";i.r(e);var n=i("23b5"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"78a8":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{padding:"30rpx"}},[i("v-uni-form",{on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.formSubmit.apply(void 0,arguments)},reset:function(e){arguments[0]=e=t.$handleEvent(e),t.formReset.apply(void 0,arguments)}}},[t.inviter?t._e():i("v-uni-view",{staticClass:"cu-form-group form-item"},[i("v-uni-view",{staticClass:"title"},[t._v("推荐码")]),i("v-uni-input",{attrs:{placeholder:"请输入推荐码",name:"promocode"}}),i("v-uni-text",{staticClass:"cuIcon-share text-orange"})],1),i("v-uni-view",{staticClass:"cu-form-group form-item"},[i("v-uni-view",{staticClass:"title"},[t._v("姓名")]),i("v-uni-input",{attrs:{placeholder:"请输入姓名",name:"username"}}),i("v-uni-text",{staticClass:"cuIcon-my text-orange"})],1),t.regionlist.length?i("v-uni-view",[i("v-uni-view",{staticClass:"cu-form-group form-item",staticStyle:{"border-radius":"100rpx"}},[i("v-uni-view",{staticClass:"title"},[t._v("省份")]),i("v-uni-picker",{attrs:{mode:"selector",value:t.provinceName,range:t.regionlist,"range-key":"provinceName"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.provinceNameChange.apply(void 0,arguments)}}},[i("v-uni-view",[t._v(t._s(t.regionlist[t.provinceIndex].provinceName||"请选择省份"))])],1)],1),t.provinceName?i("v-uni-view",[i("v-uni-view",{staticClass:"cu-form-group form-item",staticStyle:{"border-radius":"100rpx"}},[i("v-uni-view",{staticClass:"title"},[t._v("城市")]),i("v-uni-picker",{attrs:{mode:"selector",value:t.index,range:t.regionlist[t.provinceIndex].children,"range-key":"cityName"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.cityNameChange.apply(void 0,arguments)}}},[i("v-uni-view",[t._v(t._s(t.regionlist[t.provinceIndex].children[t.cityIndex].cityName||"请选择城市"))])],1)],1)],1):t._e()],1):t._e(),i("v-uni-view",{staticClass:"cu-form-group form-item"},[i("v-uni-view",{staticClass:"title"},[t._v("手机号")]),i("v-uni-input",{attrs:{type:"number",placeholder:"请输入手机号",name:"mobile"},model:{value:t.mobile,callback:function(e){t.mobile=e},expression:"mobile"}}),i("v-uni-text",{staticClass:"cuIcon-mobile text-orange"})],1),i("v-uni-view",{staticClass:"cu-form-group form-item"},[i("v-uni-view",{staticClass:"title"},[t._v("验证码")]),i("v-uni-input",{attrs:{type:"number",placeholder:"请输入验证码",name:"smscode"}}),i("CodeTime",{attrs:{mobile:t.mobile}})],1),i("v-uni-view",{staticClass:"cu-form-group form-item"},[i("v-uni-view",{staticClass:"title"},[t._v("密码")]),i("v-uni-input",{attrs:{placeholder:"请输入密码",name:"password"}}),i("v-uni-text",{staticClass:"cuIcon-lock text-orange"})],1),i("v-uni-view",{staticClass:"cu-form-group form-item"},[i("v-uni-view",{staticClass:"title"},[t._v("确认密码")]),i("v-uni-input",{attrs:{placeholder:"请输入确认密码",name:"password1"}}),i("v-uni-text",{staticClass:"cuIcon-lock text-orange"})],1),i("v-uni-button",{staticClass:"margin-top cu-btn block margin-tb-sm lg text-white",staticStyle:{background:"#FF5733"},attrs:{"form-type":"submit"}},[t.loading?i("v-uni-text",{staticClass:"cuIcon-loading2 cuIconfont-spin"}):t._e(),t._v("提交")],1)],1),i("v-uni-view",{staticStyle:{color:"#FF5733"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.topage("/pages/open/login")}}},[t._v("已有账号？前往登录")])],1)},o=[]},"8cbe":function(t,e,i){"use strict";var n=i("caf8"),a=i.n(n);a.a},caf8:function(t,e,i){var n=i("19e6");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("6b59abe3",n,!0,{sourceMap:!1,shadowMode:!1})},ff02:function(t,e,i){"use strict";i.r(e);var n=i("78a8"),a=i("6a45");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("8cbe");var s,r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"16d10c24",null,!1,n["a"],s);e["default"]=c.exports}}]);