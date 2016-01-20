var state = [];
var messagesNumber = 0;

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	if (messagesNumber == request.messagesNumber)
		return false;

	// TODO: change pages title

	if (messagesNumber < request.messagesNumber) {
		var xhr = new XMLHttpRequest();

		xhr.open("POST", "http://" + request.host + "/WebServices/A/Open.asmx/GetMenuNotifications", true);
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.send('{ts : "' + new Date().getTime() + '"}' );

		xhr.onreadystatechange = function() {
			if (xhr.readyState==4) {
				var value = xhr.responseText.replace(/\\"/g, "'"); // TODO: need better solution here.
					value = JSON.parse(value).d.replace(/'/g, '"');
				var result = JSON.parse(value);
				
				for (var k in result) {
					var UID = result[k].UID;

					if (!contains(state, UID)) {
						console.log(result[k]);
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
Json Values.

DateCreated: "10/01/2016"
Int1: 0
Repeats: 1
Text: ""
TimeCreated: "21:58"
Type: 56
UID: ""
Url: ""
*/