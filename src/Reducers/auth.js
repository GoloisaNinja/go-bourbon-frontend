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
	UPDATE_USER_WISHLISTS,
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
		case EDIT_USER_COLLECTION_REF_DETAILS:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: [
						...state.user.collections.map((collection) => {
							if (collection.collection_id === payload.id) {
								collection.collection_name = payload.name;
							}
							return collection;
						}),
					],
				},
			};
		case ADD_BOURBON_TO_USER_COLLECTION_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: [
						...state.user.collections.map((collection) => {
							if (collection.collection_id === payload.collection_id) {
								collection.bourbons.push({ bourbon_id: payload.bourbon_id });
							}
							return collection;
						}),
					],
				},
			};
		case DELETE_BOURBON_FROM_USER_COLLECTION_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: [
						...state.user.collections.map((collection) => {
							if (collection.collection_id === payload.collection_id) {
								collection.bourbons = collection.bourbons.filter(
									(bourbon) => bourbon.bourbon_id !== payload.bourbon_id
								);
							}
							return collection;
						}),
					],
				},
			};
		case CREATE_USER_COLLECTION_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: [...state.user.collections, payload],
				},
			};
		case DELETE_USER_COLLECTION_REF:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					collections: [
						...state.user.collections.filter(
							(collection) => collection.collection_id !== payload
						),
					],
				},
			};
		case UPDATE_USER_WISHLISTS:
			return {
				...state,
				loading: false,
				user: { ...state.user, wishlists: payload },
			};
		default:
			return state;
	}
}
