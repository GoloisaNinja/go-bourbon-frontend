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
		case EDIT_COLLECTION_SUCCESS:
			return {
				...state,
				loading: false,
				collections: [
					...state.collections.map((collection) => {
						if (collection._id === payload.id) {
							collection.name = payload.name;
						}
						return collection;
					}),
				],
				//quick_look: payload.collection,
			};
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
				collections: [
					...state.collections.filter(
						(collection) => collection._id !== payload
					),
				],
				quick_look: null,
			};
		case DELETE_BOURBON_FROM_COLLECTION_SUCCESS:
			return {
				...state,
				loading: false,
				collections: [
					...state.collections.map((collection) => {
						if (collection._id === payload.collectionId) {
							collection.bourbons = collection.bourbons.filter(
								(bourbon) => bourbon._id !== payload.bourbonId
							);
						}
						return collection;
					}),
				],
				//quick_look: payload.collection,
			};
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
