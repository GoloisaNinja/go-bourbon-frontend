import {
	GET_USER_WISHLISTS_SUCCESS,
	GET_USER_WISHLISTS_FAILURE,
	SET_WISHLIST_QUICKLOOK,
	CLEANUP_WISHLIST_QUICKLOOK,
	GET_USER_WISHLIST_SUCCESS,
	GET_USER_WISHLIST_FAILURE,
	UPDATE_USER_WISHLISTS,
	CREATE_WISHLIST_SUCCESS,
	CREATE_WISHLIST_FAILURE,
	EDIT_WISHLIST_SUCCESS,
	EDIT_WISHLIST_FAILURE,
	DELETE_WISHLIST_SUCCESS,
	DELETE_WISHLIST_FAILURE,
	DELETE_BOURBON_FROM_WISHLIST_SUCCESS,
	DELETE_BOURBON_FROM_WISHLIST_FAILURE,
	CLEANUP_WISHLIST,
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

export const postUserWishlist = (name) => async (dispatch) => {
	const response = await postWishlist(name);
	if (response.status === 201) {
		dispatch({
			type: CREATE_WISHLIST_SUCCESS,
			payload: response.data.wishlist,
		});
		dispatch({
			type: UPDATE_USER_WISHLISTS,
			payload: response.data.user_wishlists,
		});
		dispatch(setAlert('Wishlist Created!', 'success'));
	} else {
		dispatch({
			type: CREATE_WISHLIST_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const getUserWishlists = () => async (dispatch) => {
	const response = await getWishlists();
	if (response.status === 200) {
		dispatch({
			type: GET_USER_WISHLISTS_SUCCESS,
			payload: response.data,
		});
	} else {
		dispatch({
			type: GET_USER_WISHLISTS_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const getUserWishlistById = (id) => async (dispatch) => {
	const response = await getWishlist(id);
	if (response.status === 200) {
		dispatch({
			type: GET_USER_WISHLIST_SUCCESS,
			payload: response.data.wishlist,
		});
		return response.data.meta;
	} else {
		dispatch({
			type: GET_USER_WISHLIST_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const editUserWishlist = (id, formData) => async (dispatch) => {
	const response = await editWishlist(id, formData);
	if (response.status === 200) {
		dispatch({
			type: EDIT_WISHLIST_SUCCESS,
			payload: response.data,
		});
		dispatch({
			type: UPDATE_USER_WISHLISTS,
			payload: response.data.user_WISHLISTs,
		});
		dispatch(setAlert('Wishlist updated!', 'success'));
	} else {
		dispatch({
			type: EDIT_WISHLIST_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const addBourbontoUserWishlist =
	(wishlistId, bourbonId) => async (dispatch) => {
		const response = await addBourbon(wishlistId, bourbonId);
		if (response.status === 200) {
			dispatch({
				type: UPDATE_USER_WISHLISTS,
				payload: response.data.user_wishlists,
			});
			dispatch(setAlert('Added Bourbon!', 'success'));
		} else {
			dispatch(setAlert(response.data.message, 'danger'));
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
					wishlist: response.data.wishlist,
				},
			});
			dispatch({
				type: UPDATE_USER_WISHLISTS,
				payload: response.data.user_wishlists,
			});
			dispatch(setAlert('Deleted Bourbon!', 'success'));
		} else {
			dispatch({
				type: DELETE_BOURBON_FROM_WISHLIST_FAILURE,
			});
			dispatch(setAlert(response.data.message, 'danger'));
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
			type: UPDATE_USER_WISHLISTS,
			payload: response.data,
		});
		dispatch(setAlert('Deleted Wishlist!', 'success'));
	} else {
		dispatch({
			type: DELETE_WISHLIST_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
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
