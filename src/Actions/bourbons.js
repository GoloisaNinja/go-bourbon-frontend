import {
	START_PAGINATED_FETCH,
	GET_PAGINATED_SUCCESS,
	GET_PAGINATED_FAILURE,
	CLEANUP_BOURBONS,
} from './types';
import { setAlert } from './alert';
import { getPaginatedBourbons as getBourbons } from '../Api/Api';

export const getPaginatedBourbons =
	(page, search, sort) => async (dispatch) => {
		dispatch({
			type: START_PAGINATED_FETCH,
		});
		const response = await getBourbons(page, search, sort);
		if (response.status === 200) {
			dispatch({
				type: GET_PAGINATED_SUCCESS,
				payload: response.data,
			});
			//return response.data.meta;
		} else {
			dispatch({
				type: GET_PAGINATED_FAILURE,
			});
			dispatch(setAlert('Uh-oh! No bourbons!', 'danger'));
		}
	};

// CLEANUP FUNCTION TO RESTORE BOURBONS STATE AFTER BOURBONS PAGE IS UNMOUNTED

export const cleanUpBourbons = () => (dispatch) => {
	dispatch({
		type: CLEANUP_BOURBONS,
	});
};
