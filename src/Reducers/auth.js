import {
	START_LOGIN,
	START_REGISTER,
	START_LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	EDIT_USER_COLLECTION_REF_DETAILS,
	CREATE_USER_COLLECTION_REF,
	DELETE_USER_COLLECTION_REF,
	DELETE_BOURBON_FROM_USER_COLLECTION_REF,
	ADD_BOURBON_TO_USER_COLLECTION_REF,
	CREATE_USER_WISHLIST_REF,
	DELETE_USER_WISHLIST_REF,
	EDIT_USER_WISHLIST_REF_DETAILS,
	ADD_BOURBON_TO_USER_WISHLIST_REF,
	DELETE_BOURBON_FROM_USER_WISHLIST_REF,
	CREATE_USER_REVIEW_REF,
	EDIT_USER_REVIEW_REF,
	DELETE_USER_REVIEW_REF,
} from '../Actions/types';

const initialState = {
	loading: false,
	isAuthenticated: false,
	user: {},
	token: '',
};

export default function auth(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case START_LOGIN:
		case START_REGISTER:
		case START_LOGOUT:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: payload.user,
				token: payload.token,
			};
		case LOGIN_FAILURE:
		case REGISTER_FAILURE:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: {},
				token: '',
			};
		case LOGOUT_SUCCESS:
			return {
				loading: false,
				isAuthenticated: false,
				user: {},
				token: '',
			};
		case LOGOUT_FAILURE:
			return {
				...state,
				loading: false,
			};
		case EDIT_USER_COLLECTION_REF_DETAILS: {
			const index = state.user.collections.findIndex(
				(ref) => ref.collection_id === payload.id
			);
			const updatedCopy = [...state.user.collections];
			updatedCopy[index].collection_name = payload.name;
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: updatedCopy,
				},
			};
		}
		case ADD_BOURBON_TO_USER_COLLECTION_REF: {
			const index = state.user.collections.findIndex(
				(ref) => ref.collection_id === payload.collection_id
			);
			const updatedCopy = [...state.user.collections];
			updatedCopy[index].bourbons.push({ bourbon_id: payload.bourbon_id });
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: updatedCopy,
				},
			};
		}
		case DELETE_BOURBON_FROM_USER_COLLECTION_REF: {
			const index = state.user.collections.findIndex(
				(ref) => ref.collection_id === payload.collection_id
			);
			const updatedCopy = [...state.user.collections];
			const filteredBourbons = updatedCopy[index].bourbons.filter(
				(bourbon) => bourbon.bourbon_id !== payload.bourbon_id
			);
			updatedCopy[index].bourbons = filteredBourbons;
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: updatedCopy,
				},
			};
		}
		case CREATE_USER_COLLECTION_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: [...state.user.collections, payload],
				},
			};
		case CREATE_USER_WISHLIST_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					wishlists: [...state.user.wishlists, payload],
				},
			};
		case DELETE_USER_COLLECTION_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: state.user.collections.filter(
						(collection) => collection.collection_id !== payload
					),
				},
			};
		case DELETE_USER_WISHLIST_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					wishlists: state.user.wishlists.filter(
						(wishlist) => wishlist.wishlist_id !== payload
					),
				},
			};
		case EDIT_USER_WISHLIST_REF_DETAILS: {
			const index = state.user.wishlists.findIndex(
				(ref) => ref.wishlist_id === payload.id
			);
			const updatedCopy = [...state.user.wishlists];
			updatedCopy[index].wishlist_name = payload.name;
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					wishlists: updatedCopy,
				},
			};
		}
		case ADD_BOURBON_TO_USER_WISHLIST_REF: {
			const index = state.user.wishlists.findIndex(
				(ref) => ref.wishlist_id === payload.wishlist_id
			);
			const updatedCopy = [...state.user.wishlists];
			updatedCopy[index].bourbons.push({ bourbon_id: payload.bourbon_id });
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					wishlists: updatedCopy,
				},
			};
		}
		case DELETE_BOURBON_FROM_USER_WISHLIST_REF: {
			const index = state.user.wishlists.findIndex(
				(ref) => ref.wishlist_id === payload.wishlist_id
			);
			const updatedCopy = [...state.user.wishlists];
			const filteredBourbons = updatedCopy[index].bourbons.filter(
				(b) => b.bourbon_id !== payload.bourbon_id
			);
			updatedCopy[index].bourbons = filteredBourbons;
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					wishlists: updatedCopy,
				},
			};
		}
		case CREATE_USER_REVIEW_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					reviews: [...state.user.reviews, payload],
				},
			};
		case EDIT_USER_REVIEW_REF: {
			const index = state.user.reviews.findIndex(
				(r) => r.review_id === payload.id
			);
			const updatedCopy = [...state.user.reviews];
			updatedCopy[index].review_title = payload.title;
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					reviews: updatedCopy,
				},
			};
		}
		case DELETE_USER_REVIEW_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					reviews: state.user.reviews.filter((r) => r.review_id !== payload),
				},
			};
		default:
			return state;
	}
}
