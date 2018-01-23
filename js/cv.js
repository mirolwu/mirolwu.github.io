window.addEventListener("orientationchange", setRem);
window.addEventListener("resize", setRem);
function setRem() {
	var html = document.querySelector("html");
	var width = html.getBoundingClientRect().width;
	html.style.fontSize = width / 16 + "px";
}
setRem();

function cssTransform(el,attr,val) {
	if (!el.transform) {
		el.transform = {};
	}
	if (arguments.length>2) {
		el.transform[attr] = val;
		var sVal = "";
		for (var s in el.transform){
			switch (s) {
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					sVal += s + "(" + el.transform[s] + "deg) ";
					break;
				case "translateX":
				case "translateY":
				case "translateZ":
					sVal += s + "(" + el.transform[s] + "px) ";
					break;
				case "scaleX":
				case "scaleY":
				case "scaleZ":
				case "scale":
					sVal += s + "(" + el.transform[s] + ") ";
					break;	
			}
			el.style.WebkitTransform = el.style.transform = sVal;
		}
	} else {
		val = el.transform[attr];
		if (typeof val == "undefined" ) {
			if (attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
				val = 1;
			} else {
				val = 0;
			}
		}
		return val;
	}
};

!function () {
	var wrap = document.querySelector(".wrapper");
	var content = document.querySelector(".content");
	var allDiv = content.children;
	var wrapHeight = wrap.offsetHeight;

	for (var i = 0; i < allDiv.length; i++) {
		allDiv[i].style.height = wrapHeight + "px";
	}
}()

function myAddEvent(event, fn) {
	var wrap = document.querySelector(".wrapper");

	if (wrap.attachEvent) {
		wrap.attachEvent('on' + event, fn);
	} else {
		wrap.addEventListener(event, fn, false);
	}
};


document.addEventListener("touchstart", function (e) {
	e.preventDefault();
})

!function () {
	var a = document.querySelectorAll("a");
	for (var i = 0;i < a.length; i++) {
		a[i].addEventListener("touchmove",function() {
			this.isMove = true;
		});
		a[i].addEventListener("touchend",function() {
			if (!this.isMove) {
				window.location.href = this.href;
			}
			this.isMove = false;
		})
	}
}();

function getStyle(obj, key) {
    if (obj.currentStyle) {
        return obj.currentStyle[key];
    } else {
        return getComputedStyle(obj, false)[key];
    }
}

~function () {
	var isEnd = true;
	var isOpen = false;
	var isFirst = true;
	var isVertical = true;
	var isWorksFirst = true;
	var wrap = document.querySelector(".wrapper");
	var content = document.querySelector(".content");
	var wrapOne = document.querySelector(".wrap-one");
	var wrapTwo = document.querySelector(".wrap-two");
	var wrapThree = document.querySelector(".wrap-three");
	var wrapFour = document.querySelector(".wrap-four");
	var menuBtn = document.querySelector(".menu-btn");
	var menuBtnSpan = menuBtn.querySelectorAll("span");
	var pcSpan = document.querySelectorAll(".pc span");
	var nav = document.querySelector("nav");
	var menuLi = document.querySelectorAll(".menu-wrap li");
	var more = document.querySelector(".more");
	var pic = document.querySelector(".pic");
	var worksWrap = document.querySelector(".works-wrap");
	var worksUl = document.querySelector(".works-wrap-ul");
	var worksLi = worksUl.querySelectorAll("li");
	var contactLi = document.querySelectorAll(".contact li");
	var wrapHeight = wrap.offsetHeight;
	var initialNum = 0;
	var times = Math.round(cssTransform(content, "translateY") / wrapHeight);
	var startPoint = 0;
	var initPoint = {};
	var startY = 0;
	var minY = wrap.offsetHeight - content.offsetHeight;

	if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
	   	wrap.addEventListener("touchstart", (e) => {
		   	content.style.transition = content.style.WebkitTransition = "none";
		   	startPoint = e.changedTouches[0].pageY;
		   	startY = cssTransform(content, "translateY");
		   	isVertical = true;
	   	});

	   	wrap.addEventListener("touchmove", (e) => {
		   	var nowPoint = e.changedTouches[0].pageY;
		   	var dis = nowPoint - startPoint + startY;
		   	var chooseNum = parseFloat(getStyle(document.querySelector("html"), "fontSize"));
		   	if (dis >= 0) {
		   		dis = 0;
		   	}
		   	if (dis <= minY) {
		   		dis = minY;
		   	}
		   	if (isVertical) {
		   		cssTransform(content, "translateY", dis);
		   	}

		   	if (times == -1) {
		   		var picDis = parseFloat(7.5 + (nowPoint - startPoint) / chooseNum);
		   		pic.style.transition = "none";
		   		pic.style.transform = "translate3d(-6.75rem, " + picDis + "rem, 0) scale(4)";
		   	}
	   	});

	   	wrap.addEventListener("touchend", () => {
		   	var endPoint = cssTransform(content, "translateY");
		   	times = Math.round(endPoint / wrapHeight);
		   	content.style.transition = content.style.WebkitTransition = ".5s";
		   	pic.style.transform = "";
		   	pic.style.transition = pic.style.WebkitTransition = "all .5s";
		   	cssTransform(content, "translateY", times * wrapHeight);
		   	enter();
			picPos();

			if (times == -4) {
				for (var j = 0; j < contactLi.length - 1; j++) {
					contactLi[j].children[0].className = "contact-detail";
					contactLi[j].isShow = false;
				}
			}
	  	});

	   	menuBtn.addEventListener("touchmove", function () {
	   		this.isMove = true;
	   	})
	   	menuBtn.addEventListener("touchend", function (e) {	   	
		   	var num = Math.round(-cssTransform(content, "translateY") / wrapHeight);

		   	for (var i = 0; i < menuLi.length; i++) {
		   		menuLi[i].style.color = "white";
		   	}
		   	menuLi[num].style.color = "orange";

		   	if (!isOpen && !this.isMove) {
		   		menuBtnSpan[1].style.opacity = 0;
		   		menuBtnSpan[0].style.width = menuBtnSpan[2].style.width = 1.43 + "rem";
		   		cssTransform(menuBtnSpan[0], "rotateZ", 45);
		   		cssTransform(menuBtnSpan[2], "rotateZ", -45);
		   		cssTransform(nav, "translateX", 0);
		   	} 
		   	close();
		   	isOpen = !isOpen;
		   	this.isMove = false;
	   	})

	   	contact();
	   	function contact() {
			for (var i = 0; i < contactLi.length - 1; i++) {
				contactLi[i].isShow = false;
				contactLi[i].addEventListener("touchmove", function () {
					this.isMove = true;
				});

				contactLi[i].addEventListener("touchend", function (e) {
					window.event ? window.event.cancelBubble = true : e.stopPropagation();
					if (!this.isMove && !this.isShow) {
						this.children[0].className = "contact-detail contact-detail-show";
					} else {
						this.children[0].className = "contact-detail";
					}
					this.isShow = !this.isShow;
					this.isMove = false;
				})
			}
	   	}

	   	function close() {
		   	if (isOpen && !this.isMove) {
		   		menuBtnSpan[1].style.opacity = 1;
		   		menuBtnSpan[0].style.width = menuBtnSpan[2].style.width = 1 + "rem";
		   		cssTransform(menuBtnSpan[0], "rotateZ", 0);
		   		cssTransform(menuBtnSpan[2], "rotateZ", 0);
		   		nav.style.transform = "translateX(-100%)";
		   	}
	   	};

	   	for (var i = 0; i < menuLi.length; i++) {
		   	menuLi[i].index = i;
		   	menuLi[i].style.color = "white";
		   	menuLi[i].addEventListener("touchmove", () => {
		   		this.isMove = true;
		   	});
		   	menuLi[i].addEventListener("touchend", function (e) {
				window.event ? window.event.cancelBubble = true : e.stopPropagation();
		   		content.style.transition = content.style.WebkitTransition = "none";

		   		if (!this.isMove) {
		   			times = -this.index;
		   			close();
		   			isOpen = false;
		   		};
		   		cssTransform(content, "translateY", times * wrapHeight);
		   		enter();
				picPos();		   	
			})
		   	this.isMove = false;
	   	}

		more.addEventListener("touchmove", () => {
			this.isMove = true;
		});
		more.addEventListener("touchend", () => {
			if (!this.isMove) {
				cssTransform(content, "translateY", -wrapHeight);
			}
			this.isMove = false;
		})

		worksWrap.addEventListener("touchstart", (e) => {
			initPoint = {pageX: e.changedTouches[0].pageX, pageY: e.changedTouches[0].pageY};
			isFirst = true;
			isVertical = true;
		});

		worksWrap.addEventListener("touchmove", (e) => {
			var nowPoint = {pageX: e.changedTouches[0].pageX, pageY: e.changedTouches[0].pageY};
			var disY = Math.abs(nowPoint.pageY - initPoint.pageY);
			var disX = nowPoint.pageX - initPoint.pageX;
			var parameter = Math.abs(disX / wrap.offsetWidth);
			if (isFirst) {
				isFirst = false;
				if (Math.abs(disX) > disY) {
					isVertical = false;
				}
			}

			if (!isVertical && isWorksFirst) {
				var dire = disX > 0 ? parameter * 90 : -parameter * 90;
				var thisOne = worksLi[5].style;
				thisOne.transition = "none";
				thisOne.opacity = 1 - parameter;
				thisOne.transform = "translateX(" + disX + "px) rotateZ(" + dire + "deg) scale(" + (1 - parameter) + ")";
				thisOne.transformOrigin = disX < 0 ? "left bottom" : "right bottom";
			}
		});

		worksWrap.addEventListener("touchend", () => {
			var arr = [[-3.6, -5.3], [3.6, -5.3], [-3.6, 1.5], [3.6, 1.5], [-3.6, 8.3], [3.6, 8.3]];
			isWorksFirst = false;
			worksLi[5].style.opacity = 1;
			worksLi[5].style.transformOrigin = "center center";
			worksLi[5].style.transition = "all .5s linear";
			for (var i = 0; i < worksLi.length; i++) {
				worksLi[i].style.transform = "translate3d(" + arr[i][0] + "rem," + arr[i][1] + "rem, 0) scale(.4)";
			}
		})

	} else {
	   	myAddEvent('mousewheel', onMouseWheel);
	   	myAddEvent('DOMMouseScroll', onMouseWheel);

   		function onMouseWheel(e) {	
		   	var ev = e || event;
		   	var isDown = ev.wheelDelta < 0; 
			times = Math.round(cssTransform(content, "translateY") / wrapHeight);
			content.style.transition = content.style.WebkitTransition = ".5s";

		   	if (isDown && isEnd && times >= -3) {
		   		isEnd = false;
		   		times--;
		   		cssTransform(content, "translateY", times * wrapHeight);
		   		active();
		   		enter();
		   	}
		   	if (!isDown && isEnd && times <= -1) {
		   		isEnd = false;
		   		times++;
		   		cssTransform(content, "translateY", times * wrapHeight);
		   		active();	
		   		enter();
		   	}
			picPos();
	   	};	

	   	function active() {
   		 	for (var j = 0; j < pcSpan.length; j++) {
   				pcSpan[j].className = "";
   			}
   			times = Math.round(cssTransform(content, "translateY") / wrapHeight);
   			pcSpan[-times].className = "active";
   			setTimeout(() => {
   				isEnd = true;
   			}, 1000);
	   	}

	   	dotsClick();
		function dotsClick() {
			for (var i = 0; i < pcSpan.length; i++) {
			  	pcSpan[i].index = i;
			  	pcSpan[i].onclick = function () {
				content.style.transition = content.style.WebkitTransition = "none";
			  		for (var j = 0; j < pcSpan.length; j++) {
			  			pcSpan[j].className = "";
			  		}
			  		this.className = "active";
			  		times = -this.index;		  		
			  		enter();
			  		cssTransform(content, "translateY", times * wrapHeight);
					picPos();
			  	}
			}
		};

		more.onclick = function () {
			content.style.transition = content.style.WebkitTransition = ".5s";
			times = -1;
		 	cssTransform(content, "translateY", -wrapHeight);
		 	enter();
		 	active();
		 	picPos();
		}

	}

	function enter() {
		var box = document.querySelectorAll(".wrap-content");
		if (-times) {
			setTimeout(() => {
				box[-times - 1].className = "wrap-content enter-active";
			}, 500);
		}
		return;
	}

	function picPos() {
	 	if (times == -1) {
			pic.className = "pic pic-pos";
		} else {
			pic.className = "pic";
		}
	}
	
}();

+function () {
	var bg = document.querySelector(".bg");
	var allBg = bg.querySelectorAll("div");
	var num  = 0;
	var isFirst = true;
	var wrapHeight = document.querySelector(".wrapper").offsetHeight;
	bg.style.height = wrapHeight + "px";

	for (var i = 0; i < allBg.length; i++) {
		allBg[i].style.height = wrapHeight + "px";
	}
	changeBg();
	function changeBg() {
		for (var j = 0; j < allBg.length; j++) {
			if (isFirst) {
				allBg[j].style.transition = "none";
			} else {
				allBg[j].style.transition = "opacity 2s linear";
			}
			allBg[j].style.opacity = 0;
		}		
		num = num > 2 ? 0 : num;
		allBg[num].style.opacity = 1;
		num++;
		isFirst = false;
		setTimeout(changeBg, 6000);
	};

	for (var i = 0; i < 4; i++) {
		document.querySelector(".wrap-one-content").children[i].className += " fade-in";
	}
}();

function textLoop() {
	var text = document.querySelector(".text");
	var textVal = text.innerText;
	var arr = ["正在找工作", "有意的请联系我", "724004973@qq.com"];
	var  str = "";

	text.style.opacity = 1;

	switch (textVal) {
		case arr[0]:
			str = arr[1];
			break;
		case arr[1]:
			str = arr[2];
			break;
		default:
			str = arr[0];
			break;
	}
	text.innerText = str;
	setTimeout(() => {
		text.style.opacity = 0;
		setTimeout(textLoop, 500)
	}, 3000);
}
setTimeout(textLoop, 3500);