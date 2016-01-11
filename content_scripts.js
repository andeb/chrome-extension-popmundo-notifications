var state = {};
var notification = document.getElementById('ctl00_ctl05_ucMenuNotifications_imgNotifications');

if (notification) {
	verifyNotification();
} else {
	console.log('Not found notification box.');
}
function verifyNotification() {
	if (hasNotification()) { // one minute is a good number?!
		setTimeout(verifyNotification, 1000 * 60);

		var host = window.location.host;
		chrome.extension.sendRequest({ host : host});
	} else {
		setTimeout(verifyNotification, 1000);
	}
}

function hasNotification() {
	return notification.src.endsWith("/icon-notification-on.png");
}

// <a href="javascript:void(0);" class="top-menu-notifications-display">
//   <img id="ctl00_ctl05_ucMenuNotifications_imgNotifications" src="/Static/Images/Main/icon-notification-on.png">
// </a>