/* eslint-disable no-nested-ternary */
export const paginateResults = ({
	after,
	pageSize = 20,
	results,
	// can pass in a function to calculate an item's cursor
	getCursor = () => null
}) => {
	if (pageSize < 1) return [];

	if (!after) return results.slice(0, pageSize);
	const cursorIndex = results.findIndex(item => {
		// if an item has a `cursor` on it, use that, otherwise try to generate one
		const itemCursor = item.cursor ? item.cursor : getCursor(item);

		// if there's still not a cursor, return false by default
		return itemCursor ? after === itemCursor : false;
	});

	const endPage = Math.min(results.length, cursorIndex + 1 + pageSize);

	return cursorIndex >= 0
		? cursorIndex === results.length - 1 // don't let us overflow
			? []
			: results.slice(cursorIndex + 1, Math.min(endPage))
		: results.slice(0, pageSize);
};

export const now = () => {
	const date = new Date();
	const aaaa = date.getUTCFullYear();
	let gg = date.getUTCDate();
	let mm = date.getUTCMonth() + 1;

	if (gg < 10) gg = `0${gg}`;

	if (mm < 10) mm = `0${mm}`;

	const cur_day = `${aaaa}-${mm}-${gg}`;

	let hours = date.getUTCHours();
	let minutes = date.getUTCMinutes();
	let seconds = date.getUTCSeconds();

	if (hours < 10) hours = `0${hours}`;

	if (minutes < 10) minutes = `0${minutes}`;

	if (seconds < 10) seconds = `0${seconds}`;

	return `${cur_day} ${hours}:${minutes}:${seconds}`;
};

export const isEmail = email => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};
