  		function n() {
  			var notification = new Notification('Notification title', {
      			icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      			body: "Hey there! You've been notified!",
			});

  			chrome.notifications.create(1, notification);
  		}