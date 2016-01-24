var state = [];
var messagesNumber = 0;


chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	// only make a request when really have something to get
	if (messagesNumber == request.messagesNumber)
		return false;

	chrome.tabs.query({
		url : "http://*.popmundo.com/*"
	}, function(tabs) {
		var message = {messagesNumber: request.messagesNumber};
    	for (var i=0; i<tabs.length; ++i) {
        	chrome.tabs.sendMessage(tabs[i].id, message);
    	}
	});
	

	if (messagesNumber < request.messagesNumber) {
		var xhr = new XMLHttpRequest();

		xhr.open("POST", "http://" + request.host + "/WebServices/A/Open.asmx/GetMenuNotifications", true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
		xhr.send('{ts : "' + new Date().getTime() + '"}' );

		xhr.onreadystatechange = function() {
			if (xhr.readyState==4) {
				// var value = xhr.responseText.replace(/"/g, "'"); // TODO: need better solution here.
				//	value = JSON.parse(value).d.replace(/'/g, '"');
				var result = JSON.parse( JSON.parse( xhr.responseText ).d );
				
				for (var k in result) {
					var UID = result[k].UID;

					if (!contains(state, UID)) {
						state.push(result[k]);
						sendNotification(result[k]);
					}
				}
			}
		}
	}
	messagesNumber = request.messagesNumber;
});

function contains(array, value) {
	for (var k in array) {
		if (array[k].UID == value) {
			return true;
		}
	}
	return false;
}

function sendNotification(value) {
	var eventTime = new Date(value.DateCreated + ' ' + value.TimeCreated);
	var options = {			
		type : "basic",
		title: "You have a message!",
		iconUrl : "/images/p5757.png",
		message: value.Text
		//,eventTime : eventTime.getTime()
	};

	// TODO Create action
	chrome.notifications.create(value.UID, options);
}

/*
Example:

{
    "UID": "",
    "DateCreated": "20/01/2016",
    "TimeCreated": "21:53",
    "Text": "Anúncio da Comunidade",
    "Url": "/World/Popmundo.aspx",
    "Repeats": 1,
    "Type": 37,
    "Int1": 0
}, {
    "UID": "",
    "DateCreated": "20/01/2016",
    "TimeCreated": "09:25",
    "Text": "Message",
    "Url": "/World/Popmundo.aspx/Conversations/Conversation/3315659",
    "Repeats": 1,
    "Type": 56,
    "Int1": 0
}, {
    "UID": "",
    "DateCreated": "20/01/2016",
    "TimeCreated": "01:23",
    "Text": "Message",
    "Url": "/World/Popmundo.aspx/Conversations/SystemMessages",
    "Repeats": 1,
    "Type": 67,
    "Int1": 0
}
*/