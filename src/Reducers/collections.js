import {
	CREATE_COLLECTION_SUCCESS,
	CREATE_COLLECTION_FAILURE,
	GET_USER_COLLECTIONS_SUCCESS,
	GET_USER_COLLECTIONS_FAILURE,
	GET_USER_COLLECTION_SUCCESS,
	GET_USER_COLLECTION_FAILURE,
	SET_COLLECTION_QUICKLOOK,
	EDIT_COLLECTION_SUCCESS,
	EDIT_COLLECTION_FAILURE,
	DELETE_COLLECTION_SUCCESS,
	DELETE_COLLECTION_FAILURE,
	DELETE_BOURBON_FROM_COLLECTION_SUCCESS,
	DELETE_BOURBON_FROM_COLLECTION_FAILURE,
	CLEANUP_QUICKLOOK,
	CLEANUP_COLLECTION,
} from '../Actions/types';

const initialState = {
	loading: true,
	collection: {
		loading: true,
		collection: null,
	},
	collections: [],
	quick_look: null,
};

export default function collections(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CREATE_COLLECTION_SUCCESS:
			return {
				...state,
				loading: false,
				collections: [payload, ...state.collections],
				quick_look: payload,
			};
		case GET_USER_COLLECTION_SUCCESS:
			return {
				...state,
				collection: { loading: false, collection: payload },
			};
		case GET_USER_COLLECTION_FAILURE:
			return {
				...state,
				collection: { loading: false, collection: null },
			};
		case GET_USER_COLLECTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				collections: payload.collections,
			};
		case EDIT_COLLECTION_SUCCESS: {
			const index = state.collections.findIndex((c) => c._id === payload.id);
			const updatedCopy = [...state.collections];
			updatedCopy[index].name = payload.name;
			return {
				...state,
				loading: false,
				collections: updatedCopy,
				//quick_look: payload.collection,
			};
		}
		case CREATE_COLLECTION_FAILURE:
		case EDIT_COLLECTION_FAILURE:
		case DELETE_COLLECTION_FAILURE:
		case DELETE_BOURBON_FROM_COLLECTION_FAILURE:
			return {
				...state,
				loading: false,
			};
		case DELETE_COLLECTION_SUCCESS:
			return {
				...state,
				loading: false,
				collections: [...state.collections.filter((c) => c._id !== payload)],
				quick_look: null,
			};
		case DELETE_BOURBON_FROM_COLLECTION_SUCCESS: {
			const index = state.collections.findIndex(
				(c) => c._id === payload.collectionId
			);
			const updatedCopy = [...state.collections];
			const filteredBourbons = updatedCopy[index].bourbons.filter(
				(b) => b._id !== payload.bourbonId
			);
			updatedCopy[index].bourbons = filteredBourbons;
			return {
				...state,
				loading: false,
				collections: updatedCopy,
				//quick_look: payload.collection,
			};
		}
		case CLEANUP_COLLECTION:
			return {
				...state,
				collection: { loading: true, collection: null },
			};
		case GET_USER_COLLECTIONS_FAILURE:
			return {
				...state,
				loading: false,
				collections: [],
			};
		case SET_COLLECTION_QUICKLOOK:
			return {
				...state,
				loading: false,
				quick_look: payload,
			};
		case CLEANUP_QUICKLOOK:
			return {
				...state,
				loading: true,
				collections: [],
				quick_look: null,
			};
		default:
			return state;
	}
}
