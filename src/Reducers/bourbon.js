import {
	GET_BOURBON_FAILURE,
	GET_BOURBON_SUCCESS,
	CLEANUP_BOURBON,
	GET_BOURBON_REVIEWS_FAILURE,
	GET_BOURBON_REVIEWS_SUCCESS,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAILURE,
} from '../Actions/types';

const initialState = {
	loading: true,
	bourbon: null,
	user_reviews: { loading: true, reviews: [] },
};

export default function bourbon(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_BOURBON_SUCCESS:
			return {
				...state,
				loading: false,
				bourbon: payload,
			};
		case CLEANUP_BOURBON:
			return {
				...state,
				loading: true,
				bourbon: null,
				user_reviews: { loading: true, reviews: [] },
			};
		case GET_BOURBON_FAILURE:
			return {
				...state,
				loading: false,
				bourbon: null,
				user_reviews: { loading: true, reviews: [] },
			};
		case GET_BOURBON_REVIEWS_SUCCESS:
			return {
				...state,
				user_reviews: {
					loading: false,
					reviews: payload,
				},
			};
		case GET_BOURBON_REVIEWS_FAILURE:
			return {
				...state,
				user_reviews: {
					loading: false,
					reviews: [],
				},
			};
		case CREATE_REVIEW_SUCCESS:
			return {
				...state,
				user_reviews: {
					loading: false,
					reviews: [payload, ...state.user_reviews.reviews],
				},
			};
		case CREATE_REVIEW_FAILURE:
			return {
				...state,
				user_reviews: {
					loading: false,
					reviews: [...state.user_reviews.reviews],
				},
			};
		default:
			return state;
	}
}
