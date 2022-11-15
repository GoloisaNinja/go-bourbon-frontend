import {
	GET_USER_COLLECTIONS_SUCCESS,
	GET_USER_COLLECTIONS_FAILURE,
	SET_COLLECTION_QUICKLOOK,
	CLEANUP_QUICKLOOK,
	GET_USER_COLLECTION_SUCCESS,
	GET_USER_COLLECTION_FAILURE,
	UPDATE_USER_COLLECTIONS,
	CREATE_COLLECTION_SUCCESS,
	CREATE_COLLECTION_FAILURE,
	EDIT_COLLECTION_SUCCESS,
	EDIT_COLLECTION_FAILURE,
	DELETE_COLLECTION_SUCCESS,
	DELETE_COLLECTION_FAILURE,
	DELETE_BOURBON_FROM_COLLECTION_SUCCESS,
	DELETE_BOURBON_FROM_COLLECTION_FAILURE,
	CLEANUP_COLLECTION,
} from './types';
import {
	postUserCollection as postCollection,
	getUserCollections as getCollections,
	getUserCollectionById as getCollection,
	editUserCollection as editCollection,
	deleteUserCollection as deleteCollection,
	addBourbonToUserCollection as addBourbon,
	deleteBourbonFromUserCollection as deleteBourbon,
} from '../Api/Api';
import { setAlert } from './alert';

export const postUserCollection = (name) => async (dispatch) => {
	const response = await postCollection(name);
	if (response.status === 201) {
		dispatch({
			type: CREATE_COLLECTION_SUCCESS,
			payload: response.data.collection,
		});
		dispatch({
			type: UPDATE_USER_COLLECTIONS,
			payload: response.data.user_collections,
		});
		dispatch(setAlert('Collection Created!', 'success'));
	} else {
		dispatch({
			type: CREATE_COLLECTION_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const getUserCollections = () => async (dispatch) => {
	const response = await getCollections();
	if (response.status === 200) {
		dispatch({
			type: GET_USER_COLLECTIONS_SUCCESS,
			payload: response.data,
		});
	} else {
		dispatch({
			type: GET_USER_COLLECTIONS_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const getUserCollectionById = (id) => async (dispatch) => {
	const response = await getCollection(id);
	if (response.status === 200) {
		dispatch({
			type: GET_USER_COLLECTION_SUCCESS,
			payload: response.data.collection,
		});
		return response.data.meta;
	} else {
		dispatch({
			type: GET_USER_COLLECTION_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const editUserCollection = (id, formData) => async (dispatch) => {
	const response = await editCollection(id, formData);
	if (response.status === 200) {
		dispatch({
			type: EDIT_COLLECTION_SUCCESS,
			payload: response.data,
		});
		dispatch({
			type: UPDATE_USER_COLLECTIONS,
			payload: response.data.user_collections,
		});
		dispatch(setAlert('Collection updated!', 'success'));
	} else {
		dispatch({
			type: EDIT_COLLECTION_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const addBourbontoUserCollection =
	(collectionId, bourbonId) => async (dispatch) => {
		const response = await addBourbon(collectionId, bourbonId);
		if (response.status === 200) {
			dispatch({
				type: UPDATE_USER_COLLECTIONS,
				payload: response.data.user_collections,
			});
			dispatch(setAlert('Added Bourbon!', 'success'));
		} else {
			dispatch(setAlert(response.data.message, 'danger'));
		}
	};

export const deleteBourbonFromUserCollection =
	(collectionId, bourbonId) => async (dispatch) => {
		const response = await deleteBourbon(collectionId, bourbonId);
		if (response.status === 200) {
			dispatch({
				type: DELETE_BOURBON_FROM_COLLECTION_SUCCESS,
				payload: {
					collectionId,
					bourbonId,
					collection: response.data.collection,
				},
			});
			dispatch({
				type: UPDATE_USER_COLLECTIONS,
				payload: response.data.user_collections,
			});
			dispatch(setAlert('Deleted Bourbon!', 'success'));
		} else {
			dispatch({
				type: DELETE_BOURBON_FROM_COLLECTION_FAILURE,
			});
			dispatch(setAlert(response.data.message, 'danger'));
		}
	};

export const deleteUserCollection = (id) => async (dispatch) => {
	const response = await deleteCollection(id);
	if (response.status === 200) {
		dispatch({
			type: DELETE_COLLECTION_SUCCESS,
			payload: id,
		});
		dispatch({
			type: UPDATE_USER_COLLECTIONS,
			payload: response.data,
		});
		dispatch(setAlert('Deleted Collection!', 'success'));
	} else {
		dispatch({
			type: DELETE_COLLECTION_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const setCollectionQuicklook = (collection) => (dispatch) => {
	dispatch({
		type: SET_COLLECTION_QUICKLOOK,
		payload: collection,
	});
};

export const cleanupQuicklook = () => (dispatch) => {
	dispatch({
		type: CLEANUP_QUICKLOOK,
	});
};

export const cleanupCollection = () => (dispatch) => {
	dispatch({
		type: CLEANUP_COLLECTION,
	});
};
