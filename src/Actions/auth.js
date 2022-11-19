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
} from './types';
import {
	loginUser as getUser,
	logoutUser as endSession,
	registerUser as createUser,
} from '../Api/Api';
import { setAlert } from './alert';
import ErrorResponseHelper from '../utils/ErrorResponseHelper';

export const loginUser = (email, password) => async (dispatch) => {
	dispatch({
		type: START_LOGIN,
	});
	const response = await getUser(email, password);
	if (response.status === 200) {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: response.data,
		});
		dispatch(setAlert('Login Successful!', 'success'));
		localStorage.setItem('token', response.data.token);
	} else {
		dispatch({
			type: LOGIN_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const logoutUser = () => async (dispatch) => {
	dispatch({
		type: START_LOGOUT,
	});
	const token = localStorage.getItem('token');
	const response = await endSession(token);
	if (response.status === 200) {
		dispatch({
			type: LOGOUT_SUCCESS,
		});
		dispatch(setAlert('Logout Successful...', 'success'));
		localStorage.removeItem(token);
	} else {
		dispatch({
			type: LOGOUT_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};

export const registerUser = (formData) => async (dispatch) => {
	dispatch({
		type: START_REGISTER,
	});
	const response = await createUser(formData);
	if (response.status === 200) {
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response.data,
		});
		localStorage.setItem('token', response.data.token);
		dispatch(setAlert('Welcome! Account Created!', 'success'));
	} else {
		dispatch({
			type: REGISTER_FAILURE,
		});
		dispatch(setAlert(ErrorResponseHelper(response), 'danger'));
	}
};
