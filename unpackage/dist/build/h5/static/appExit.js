document.addEventListener('plusready', function(){
	//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。")
	var webview = plus.webview.currentWebview();
	var first = null;
	plus.key.addEventListener('backbutton', function() {
		
		webview.canBack(function(e) {
			if (e.canBack) {
				webview.back();
			} else {
				//webview.close(); //hide,quit
				//plus.runtime.quit();
				//首页返回键处理
				//处理逻辑：1秒内，连续两次按返回键，则退出应用；
				//首次按键，提示‘再按一次退出应用’
				if (!first) {
					first = new Date().getTime();
					// toast('双击返回键退出应用'); //调用自己写的吐丝提示 函数
					console.log('再按一次退出应用');
					plus.nativeUI.toast("亲，再按一次您就退出应用了哦", {
						duration: 'short'
					}); //通过H5+ API调用Android 上的toast 提示框
					setTimeout(function() {
						first = null;
					}, 1000);
				} else {
					if (new Date().getTime() - first < 1400) {
						plus.runtime.quit();
					}
				}
			}
		})
	}, false);
	/*沉浸式延伸的问题:状态栏的高度被忽略*/
	// plus.webview.currentWebview().setStyle({
	// 	statusbar:{background:'#ff0000'},top:0,bottom: 0
	// });
});