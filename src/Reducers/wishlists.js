import {
	CREATE_WISHLIST_SUCCESS,
	CREATE_WISHLIST_FAILURE,
	GET_USER_WISHLISTS_SUCCESS,
	GET_USER_WISHLISTS_FAILURE,
	GET_USER_WISHLIST_SUCCESS,
	GET_USER_WISHLIST_FAILURE,
	SET_WISHLIST_QUICKLOOK,
	EDIT_WISHLIST_SUCCESS,
	EDIT_WISHLIST_FAILURE,
	DELETE_WISHLIST_SUCCESS,
	DELETE_WISHLIST_FAILURE,
	DELETE_BOURBON_FROM_WISHLIST_SUCCESS,
	DELETE_BOURBON_FROM_WISHLIST_FAILURE,
	CLEANUP_WISHLIST_QUICKLOOK,
	CLEANUP_WISHLIST,
} from '../Actions/types';

const initialState = {
	loading: true,
	wishlist: {
		loading: true,
		wishlist: null,
	},
	wishlists: [],
	quick_look: null,
};

export default function wishlists(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CREATE_WISHLIST_SUCCESS:
			return {
				...state,
				loading: false,
				wishlists: [payload, ...state.wishlists],
				quick_look: payload,
			};
		case GET_USER_WISHLIST_SUCCESS:
			return {
				...state,
				wishlist: { loading: false, wishlist: payload },
			};
		case GET_USER_WISHLIST_FAILURE:
			return {
				...state,
				wishlist: { loading: false, wishlist: null },
			};
		case GET_USER_WISHLISTS_SUCCESS:
			return {
				...state,
				loading: false,
				wishlists: payload,
			};
		case EDIT_WISHLIST_SUCCESS: {
			const index = state.wishlists.findIndex((w) => w._id === payload.id);
			const updatedCopy = [...state.wishlists];
			updatedCopy[index].name = payload.name;
			return {
				...state,
				loading: false,
				wishlists: updatedCopy,
				//quick_look: payload.wishlist,
			};
		}
		case CREATE_WISHLIST_FAILURE:
		case EDIT_WISHLIST_FAILURE:
		case DELETE_WISHLIST_FAILURE:
		case DELETE_BOURBON_FROM_WISHLIST_FAILURE:
			return {
				...state,
				loading: false,
			};
		case DELETE_WISHLIST_SUCCESS:
			return {
				...state,
				loading: false,
				wishlists: state.wishlists.filter((w) => w._id !== payload),
				quick_look: null,
			};
		case DELETE_BOURBON_FROM_WISHLIST_SUCCESS: {
			const index = state.wishlists.findIndex(
				(w) => w._id === payload.wishlistId
			);
			const updatedCopy = [...state.wishlists];
			const filteredBourbons = updatedCopy[index].bourbons.filter(
				(bourbon) => bourbon._id !== payload.bourbonId
			);
			updatedCopy[index].bourbons = filteredBourbons;
			return {
				...state,
				loading: false,
				wishlists: updatedCopy,
				//quick_look: payload.wishlist,
			};
		}
		case CLEANUP_WISHLIST:
			return {
				...state,
				wishlist: { loading: true, wishlist: null },
			};
		case GET_USER_WISHLISTS_FAILURE:
			return {
				...state,
				loading: false,
				wishlists: [],
			};
		case SET_WISHLIST_QUICKLOOK:
			return {
				...state,
				loading: false,
				quick_look: payload,
			};
		case CLEANUP_WISHLIST_QUICKLOOK:
			return {
				...state,
				loading: true,
				wishlists: [],
				quick_look: null,
			};
		default:
			return state;
	}
}
