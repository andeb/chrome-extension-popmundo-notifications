var notification = document.getElementById('top-menu-notifications-num');

if (notification) {
	// notify when client detects a notification
	var observer = new MutationObserver((function(mutations, observer) {
	    var display = notification.style.display;

	    var messagesNumber = display == "block" ?  notification.textContent : 0;
		var host = window.location.host;
		chrome.extension.sendRequest({ host : host, messagesNumber : messagesNumber});

		return arguments.callee;
	})());

	observer.observe(notification, {
	  attributes: true,
	  characterData :true
	});
} else {
	console.log('Not found notifications menu.');
}

