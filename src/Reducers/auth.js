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
	UPDATE_USER_COLLECTIONS,
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
		case UPDATE_USER_COLLECTIONS:
			return {
				...state,
				loading: false,
				user: { ...state.user, collections: payload },
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
