import {
	GET_BOURBON_REVIEWS_SUCCESS,
	GET_BOURBON_REVIEWS_FAILURE,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAILURE,
	EDIT_REVIEW_SUCCESS,
	EDIT_REVIEW_FAILURE,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
	GET_USER_REVIEWS_SUCCESS,
	GET_USER_REVIEWS_FAILURE,
	SET_DASH_REVIEW,
	CLEANUP_REVIEWS,
} from './types';
import { setAlert } from './alert';
import {
	getBourbonReviews as getReviews,
	postBourbonReview as postReview,
	editUserReview as editReview,
	deleteUserReview as deleteReview,
	getUserBourbonReviews as getUserReviews,
} from '../Api/Api';

export const getBourbonReviews = (id) => async (dispatch) => {
	const response = await getReviews(id);
	if (response.status === 200) {
		dispatch({
			type: GET_BOURBON_REVIEWS_SUCCESS,
			payload: response.data,
		});
	} else {
		dispatch({
			type: GET_BOURBON_REVIEWS_FAILURE,
		});
		//dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const getUserBourbonReviews = (id) => async (dispatch) => {
	const response = await getUserReviews(id);
	if (response.status === 200) {
		dispatch({
			type: GET_USER_REVIEWS_SUCCESS,
			payload: response.data,
		});
	} else {
		dispatch({
			type: GET_USER_REVIEWS_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const postBourbonReview = (formData) => async (dispatch) => {
	const response = await postReview(formData);
	if (response.status === 201) {
		dispatch({
			type: CREATE_REVIEW_SUCCESS,
			payload: response.data,
		});
		dispatch(setAlert('Review Submitted!', 'success'));
	} else {
		dispatch({
			type: CREATE_REVIEW_FAILURE,
		});
		dispatch(setAlert('Something went wrong...', 'danger'));
	}
};

export const editUserReview = (id, formData) => async (dispatch) => {
	const response = await editReview(id, formData);
	if (response.status === 200) {
		dispatch({
			type: EDIT_REVIEW_SUCCESS,
			payload: response.data,
		});
		dispatch(setAlert('Review Edit Complete!', 'success'));
	} else {
		dispatch({
			type: EDIT_REVIEW_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const deleteUserReview = (id) => async (dispatch) => {
	const response = await deleteReview(id);
	if (response.status === 200) {
		dispatch({
			type: DELETE_REVIEW_SUCCESS,
			payload: id,
		});
		dispatch(setAlert('Deleted Review!', 'success'));
	} else {
		dispatch({
			type: DELETE_REVIEW_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const setDashboardReview = (review) => async (dispatch) => {
	dispatch({
		type: SET_DASH_REVIEW,
		payload: review,
	});
};

export const cleanupReviews = () => (dispatch) => {
	dispatch({
		type: CLEANUP_REVIEWS,
	});
};
