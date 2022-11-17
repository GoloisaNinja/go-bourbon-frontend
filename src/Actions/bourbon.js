import {
	GET_BOURBON_SUCCESS,
	GET_BOURBON_FAILURE,
	CLEANUP_BOURBON,
} from './types';
import { setAlert } from './alert';
import { getSingleBourbon as getBourbon } from '../Api/Api';

export const getSingleBourbon = (id) => async (dispatch) => {
	const response = await getBourbon(id);
	if (response.status === 200) {
		dispatch({
			type: GET_BOURBON_SUCCESS,
			payload: response.data.bourbon,
		});
		//return response.data.meta;
	} else {
		dispatch({
			type: GET_BOURBON_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

// CLEANUP FUNCTION TO RESTORE BOURBON STATE AFTER SINGLE BOURBON PAGE IS UNMOUNTED

export const cleanUpBourbon = () => (dispatch) => {
	dispatch({
		type: CLEANUP_BOURBON,
	});
};
