const ErrorResponseHelper = (r) => {
	const clearMsgMap = {
		'mongo: no documents in result': 'double check your request...',
	};
	const m = r.message;
	let d = r.data;
	if (Object.hasOwn(r.data, 'data')) {
		d = r.data.data;
		if (clearMsgMap[d]) {
			d = clearMsgMap[d];
		}
	}
	return m + ' ' + d;
};
export default ErrorResponseHelper;
