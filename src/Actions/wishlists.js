import {
	GET_USER_WISHLISTS_SUCCESS,
	GET_USER_WISHLISTS_FAILURE,
	SET_WISHLIST_QUICKLOOK,
	CLEANUP_WISHLIST_QUICKLOOK,
	GET_USER_WISHLIST_SUCCESS,
	GET_USER_WISHLIST_FAILURE,
	CREATE_WISHLIST_SUCCESS,
	CREATE_WISHLIST_FAILURE,
	EDIT_WISHLIST_SUCCESS,
	EDIT_WISHLIST_FAILURE,
	DELETE_WISHLIST_SUCCESS,
	DELETE_WISHLIST_FAILURE,
	DELETE_BOURBON_FROM_WISHLIST_SUCCESS,
	DELETE_BOURBON_FROM_WISHLIST_FAILURE,
	CLEANUP_WISHLIST,
	// new types
	CREATE_USER_WISHLIST_REF,
	DELETE_USER_WISHLIST_REF,
	EDIT_USER_WISHLIST_REF_DETAILS,
	ADD_BOURBON_TO_USER_WISHLIST_REF,
	DELETE_BOURBON_FROM_USER_WISHLIST_REF,
} from './types';
import {
	postUserWishlist as postWishlist,
	getUserWishlists as getWishlists,
	getUserWishlistById as getWishlist,
	editUserWishlist as editWishlist,
	deleteUserWishlist as deleteWishlist,
	addBourbonToUserWishlist as addBourbon,
	deleteBourbonFromUserWishlist as deleteBourbon,
} from '../Api/Api';
import { setAlert } from './alert';
import ErrorResponseHelper from '../utils/ErrorResponseHelper';

export const postUserWishlist = (name) => async (dispatch) => {
	const response = await postWishlist(name);
	if (response.status === 200) {
		dispatch({
			type: CREATE_WISHLIST_SUCCESS,
			payload: response.data.wishlist,
		});
		dispatch({
			type: CREATE_USER_WISHLIST_REF,
			payload: response.data.user_wishlist,
		});
		dispatch(setAlert('Wishlist Created!', 'success'));
	} else {
		dispatch({
			type: CREATE_WISHLIST_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const getUserWishlists = () => async (dispatch) => {
	const response = await getWishlists();
	if (response.status === 200) {
		dispatch({
			type: GET_USER_WISHLISTS_SUCCESS,
			payload: response.data.wishlists,
		});
	} else {
		dispatch({
			type: GET_USER_WISHLISTS_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const getUserWishlistById = (id) => async (dispatch) => {
	const response = await getWishlist(id);
	if (response.status === 200) {
		dispatch({
			type: GET_USER_WISHLIST_SUCCESS,
			payload: response.data.wishlist,
		});
		//return response.data.meta;
	} else {
		dispatch({
			type: GET_USER_WISHLIST_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const editUserWishlist = (id, formData) => async (dispatch) => {
	const { name } = formData;
	const response = await editWishlist(id, formData);
	if (response.status === 200) {
		dispatch({
			type: EDIT_WISHLIST_SUCCESS,
			payload: { id, name },
		});
		dispatch({
			type: EDIT_USER_WISHLIST_REF_DETAILS,
			payload: { id, name },
		});
		dispatch(setAlert('Wishlist updated!', 'success'));
	} else {
		dispatch({
			type: EDIT_WISHLIST_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const addBourbontoUserWishlist =
	(wishlistId, bourbonId) => async (dispatch) => {
		const response = await addBourbon(wishlistId, bourbonId);
		if (response.status === 200) {
			dispatch({
				type: ADD_BOURBON_TO_USER_WISHLIST_REF,
				payload: { bourbon_id: bourbonId, wishlist_id: wishlistId },
			});
			dispatch(setAlert('Added Bourbon!', 'success'));
		} else {
			dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
		}
	};

export const deleteBourbonFromUserWishlist =
	(wishlistId, bourbonId) => async (dispatch) => {
		const response = await deleteBourbon(wishlistId, bourbonId);
		if (response.status === 200) {
			dispatch({
				type: DELETE_BOURBON_FROM_WISHLIST_SUCCESS,
				payload: {
					wishlistId,
					bourbonId,
				},
			});
			dispatch({
				type: DELETE_BOURBON_FROM_USER_WISHLIST_REF,
				payload: { wishlist_id: wishlistId, bourbon_id: bourbonId },
			});
			dispatch(setAlert('Deleted Bourbon!', 'success'));
		} else {
			dispatch({
				type: DELETE_BOURBON_FROM_WISHLIST_FAILURE,
			});
			dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
		}
	};

export const deleteUserWishlist = (id) => async (dispatch) => {
	const response = await deleteWishlist(id);
	if (response.status === 200) {
		dispatch({
			type: DELETE_WISHLIST_SUCCESS,
			payload: id,
		});
		dispatch({
			type: DELETE_USER_WISHLIST_REF,
			payload: id,
		});
		dispatch(setAlert('Deleted Wishlist!', 'success'));
	} else {
		dispatch({
			type: DELETE_WISHLIST_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const setWishlistQuicklook = (wishlist) => (dispatch) => {
	dispatch({
		type: SET_WISHLIST_QUICKLOOK,
		payload: wishlist,
	});
};

export const cleanupQuicklook = () => (dispatch) => {
	dispatch({
		type: CLEANUP_WISHLIST_QUICKLOOK,
	});
};

export const cleanupWishlist = () => (dispatch) => {
	dispatch({
		type: CLEANUP_WISHLIST,
	});
};
