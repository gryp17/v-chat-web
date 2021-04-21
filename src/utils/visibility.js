/**
 * Returns the hidden prop depending on the browser
 * @returns {String}
 */
function getHiddenProp() {
	const prefixes = ['webkit', 'moz', 'ms', 'o'];

	// if 'hidden' is natively supported just return it
	if ('hidden' in document) {
		return 'hidden';
	}

	// otherwise loop over all the known prefixes until we find one
	for (let i = 0; i < prefixes.length; i++) {
		if ((`${prefixes[i]}Hidden`) in document) {
			return `${prefixes[i]}Hidden`;
		}
	}

	// otherwise it's not supported
	return null;
}

/**
 * Returns the visibility event name using the hidden prop
 * @returns {String}
 */
function getVisibilityEventName() {
	const visProp = getHiddenProp();

	if (visProp) {
		return `${visProp.replace(/[H|h]idden/, '')}visibilitychange`;
	}

	return null;
}

/**
 * Returns the hidden state of the window
 * @returns {Boolean}
 */
function windowIsHidden() {
	const prop = getHiddenProp();
	if (!prop) return false;

	return document[prop];
}

export {
	getVisibilityEventName,
	windowIsHidden
};
