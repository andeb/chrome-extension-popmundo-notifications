var notification = document.getElementById('top-menu-notifications-num');

if (notification) {
	var observer = new MutationObserver((function(mutations, observer) {
	    var display = notification.style.display;

	    var messagesNumber = display == "block" ?  notification.textContent : 0;
		var host = window.location.host;
		chrome.extension.sendRequest({ host : host, messagesNumber : messagesNumber});

		return arguments.callee;
	})());

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe(notification, {
	  // subtree: true,
	  // childList: true,
	  attributes: true,
	  characterData :true
	});
} else {
	console.log('Not found notifications menu.');
}

