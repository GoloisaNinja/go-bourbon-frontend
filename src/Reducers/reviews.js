import {
	GET_USER_REVIEWS_SUCCESS,
	GET_USER_REVIEWS_FAILURE,
	EDIT_REVIEW_SUCCESS,
	EDIT_REVIEW_FAILURE,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
	SET_DASH_REVIEW,
	CLEANUP_REVIEWS,
} from '../Actions/types';

const initialState = {
	loading: true,
	review: null,
	reviews: [],
};

export default function reviews(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_USER_REVIEWS_SUCCESS:
			return {
				...state,
				loading: false,
				reviews: payload,
			};
		case GET_USER_REVIEWS_FAILURE:
			return {
				...state,
				loading: false,
				reviews: [],
			};
		case EDIT_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				review: payload.review,
				reviews: payload.reviews,
			};
		case DELETE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				review: null,
				reviews: state.reviews.filter((review) => review._id !== payload),
			};
		case EDIT_REVIEW_FAILURE:
		case DELETE_REVIEW_FAILURE:
			return {
				...state,
				loading: false,
			};
		case SET_DASH_REVIEW:
			return {
				...state,
				review: payload,
			};
		case CLEANUP_REVIEWS:
			return {
				...state,
				loading: true,
				review: null,
				reviews: [],
			};
		default:
			return state;
	}
}
