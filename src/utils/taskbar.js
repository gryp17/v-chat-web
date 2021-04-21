let toggle = false;
let intervalId = null;

/**
 * Sets the unread message app title
 */
function setUnreadMessageTitle() {
	clearInterval(intervalId);
	toggle = true;

	intervalId = setInterval(() => {
		if (toggle) {
			document.title = 'New message - vChat';
		} else {
			document.title = 'vChat';
		}

		toggle = !toggle;
	}, 500);
}

/**
 * Resets the app title
 */
function resetTitle() {
	clearInterval(intervalId);
	document.title = 'vChat';
}

export {
	setUnreadMessageTitle,
	resetTitle
};
