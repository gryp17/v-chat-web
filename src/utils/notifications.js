import Cookies from 'js-cookie';
import config from '@/config';

/**
 * Checks if the notification permission modal was displayed
 * @returns {Boolean}
 */
function notificationPermissionRequested() {
	return !!Cookies.get(config.notificationPermissionCookie);
}

/**
 * Sets the notification permission cookie
 * @param {Boolean} value
 */
function setNotificationPermissionRequested(value) {
	Cookies.set(config.notificationPermissionCookie, value, { expires: 7 });
}

/**
 * Displays the browser notification permission dialog
 * @returns {Promise}
 */
async function requestNotificationPermission() {
	return Notification.requestPermission();
}

/**
 * Shows a notification
 * @param {String} title
 * @param {String} body
 * @param {String} icon
 */
function showNotification(title, body, icon = null) {
	new Notification(title, {
		icon,
		body
	});
}

/**
 * Shows a new message notification
 * @param {String} message
 * @param {String} author
 * @param {Object} conversation
 */
function showNewMessageNotification(message, author, conversation) {
	const action = message.type === 'file' ? 'sent a file:' : 'wrote:';
	const title = conversation.isPrivate ? `${author.displayName} ${action}` : `[${conversation.name}] ${author.displayName} ${action}`;
	const body = message.type === 'file' ? message.file.originalName : message.content;

	showNotification(title, body, author.avatarLink);
}

/**
 * Shows an online status notification
 * @param {Object} user
 */
function showOnlineUserNotification(user) {
	const title = `${user.displayName} has come online`;
	showNotification(title, '', user.avatarLink);
}

export {
	notificationPermissionRequested,
	setNotificationPermissionRequested,
	requestNotificationPermission,
	showNotification,
	showNewMessageNotification,
	showOnlineUserNotification
};
