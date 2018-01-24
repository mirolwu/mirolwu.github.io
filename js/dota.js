window.addEventListener("orientationchange", setRem);
window.addEventListener("resize", setRem);
function setRem() {
	var html = document.querySelector("html");
	var width = html.getBoundingClientRect().width;
	if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
	   html.style.fontSize = width / 16 + "px";
	} else {
	   html.style.fontSize = 83.5 + "px";	
	}
}
setRem();

!function () {
	var newPlayer = document.querySelector(".new-player");
	var oldPlayer = document.querySelector(".old-player");
	var newPlayerPic = document.querySelector(".new-player-pic");
	var oldPlayerPic = document.querySelector(".old-player-pic");
	var isFirst = true;
	var newPic = newPlayerPic.style
	var oldPic = oldPlayerPic.style
	newPic.transition = '.5s ease-out'
	oldPic.transition = '.5s ease-out'
	newPlayer.addEventListener('mouseover', () => {
		if (!isFirst) {
			oldPic.transform = 'translateX(20px)'
			oldPic.WebkitTransform = 'translateX(20px)'
			oldPic.opacity = 0
			newPic.opacity = 1
			newPic.transform = 'translateX(20px)'
			newPic.WebkitTransform = 'translateX(20px)'
		}
		return
	})
	oldPlayer.addEventListener('mouseover', () => {
		newPic.transform = 'translateX(-20px)'
		newPic.WebkitTransform = 'translateX(-20px)'
		newPic.opacity = 0
		oldPic.opacity = 1
		oldPic.transform = 'translateX(-20px)'
		oldPic.WebkitTransform = 'translateX(-20px)'
		isFirst = false
	})
}()