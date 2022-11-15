import { nanoid } from 'nanoid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert =
	(msg, type, timeout = 5000) =>
	(dispatch) => {
		const id = nanoid();
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		});
		setTimeout(() => {
			dispatch({
				type: REMOVE_ALERT,
				payload: id,
			});
		}, timeout);
	};
