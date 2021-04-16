import axios from 'axios';

/**
 * Opens a save file dialog and downloads the file
 * @param {String} link
 * @param {String} name
 */
async function download(link, name) {
	const response = await axios.get(link, { responseType: 'blob' });
	const blob = new Blob([response.data]);
	const anchor = document.createElement('a');
	anchor.href = URL.createObjectURL(blob);
	anchor.download = name;
	anchor.click();
	URL.revokeObjectURL(anchor.href);
}

/**
 * Opens the file (image) in a new window
 * @param {String} link
 */
function openFile(link) {
	window.open(link, '_blank');
}

export {
	download,
	openFile
};
