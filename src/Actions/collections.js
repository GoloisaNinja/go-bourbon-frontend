import {
	GET_USER_COLLECTIONS_SUCCESS,
	GET_USER_COLLECTIONS_FAILURE,
	SET_COLLECTION_QUICKLOOK,
	CLEANUP_QUICKLOOK,
	GET_USER_COLLECTION_SUCCESS,
	GET_USER_COLLECTION_FAILURE,
	ADD_BOURBON_TO_USER_COLLECTION_REF,
	CREATE_USER_COLLECTION_REF,
	CREATE_COLLECTION_SUCCESS,
	CREATE_COLLECTION_FAILURE,
	EDIT_COLLECTION_SUCCESS,
	EDIT_COLLECTION_FAILURE,
	DELETE_COLLECTION_SUCCESS,
	DELETE_COLLECTION_FAILURE,
	DELETE_BOURBON_FROM_COLLECTION_SUCCESS,
	DELETE_BOURBON_FROM_COLLECTION_FAILURE,
	DELETE_BOURBON_FROM_USER_COLLECTION_REF,
	DELETE_USER_COLLECTION_REF,
	CLEANUP_COLLECTION,
	EDIT_USER_COLLECTION_REF_DETAILS,
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
import ErrorResponseHelper from '../utils/ErrorResponseHelper';

export const postUserCollection = (name) => async (dispatch) => {
	const response = await postCollection(name);
	if (response.status === 200) {
		// collection state
		dispatch({
			type: CREATE_COLLECTION_SUCCESS,
			payload: response.data.collection,
		});
		// user state
		dispatch({
			type: CREATE_USER_COLLECTION_REF,
			payload: response.data.user_collection,
		});
		dispatch(setAlert('Collection Created!', 'success'));
	} else {
		dispatch({
			type: CREATE_COLLECTION_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
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
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const getUserCollectionById = (id) => async (dispatch) => {
	const response = await getCollection(id);
	if (response.status === 200) {
		dispatch({
			type: GET_USER_COLLECTION_SUCCESS,
			payload: response.data.collection,
		});
		//return response.data.meta;
	} else {
		dispatch({
			type: GET_USER_COLLECTION_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const editUserCollection = (id, formData) => async (dispatch) => {
	const { name } = formData;
	const response = await editCollection(id, formData);
	if (response.status === 200) {
		// collections state
		dispatch({
			type: EDIT_COLLECTION_SUCCESS,
			payload: { id, name, collection: response.data.collection },
		});
		// user state
		dispatch({
			type: EDIT_USER_COLLECTION_REF_DETAILS,
			payload: { id, name },
		});
		dispatch(setAlert('Collection updated!', 'success'));
	} else {
		dispatch({
			type: EDIT_COLLECTION_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const addBourbontoUserCollection =
	(collectionId, bourbonId) => async (dispatch) => {
		const response = await addBourbon(collectionId, bourbonId);
		if (response.status === 200) {
			dispatch({
				type: ADD_BOURBON_TO_USER_COLLECTION_REF,
				payload: { collection_id: collectionId, bourbon_id: bourbonId },
			});
			dispatch(setAlert('Added Bourbon!', 'success'));
		} else {
			dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
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
				type: DELETE_BOURBON_FROM_USER_COLLECTION_REF,
				payload: { collection_id: collectionId, bourbon_id: bourbonId },
			});
			dispatch(setAlert('Deleted Bourbon!', 'success'));
		} else {
			dispatch({
				type: DELETE_BOURBON_FROM_COLLECTION_FAILURE,
			});
			dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
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
			type: DELETE_USER_COLLECTION_REF,
			payload: id,
		});
		dispatch(setAlert('Deleted Collection!', 'success'));
	} else {
		dispatch({
			type: DELETE_COLLECTION_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
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
