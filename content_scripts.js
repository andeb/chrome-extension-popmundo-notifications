var state = {};
var notification = document.getElementById('ctl00_ctl05_ucMenuNotifications_imgNotifications');

if (notification) {
	setInterval(function() {
		if (hasNotification()) {
			var host = window.location.host;
			chrome.extension.sendRequest({ host : host});	
		}
	}(), 1000 * 60); // one minute is a good number?!
} else {
	console.log('Not found notification box.');
}

function hasNotification() {
	return notification.src.endsWith("/icon-notification-on.png");
}

// <a href="javascript:void(0);" class="top-menu-notifications-display">
//   <img id="ctl00_ctl05_ucMenuNotifications_imgNotifications" src="/Static/Images/Main/icon-notification-on.png">
// </a>