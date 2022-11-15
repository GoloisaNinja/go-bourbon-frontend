import {
	START_PAGINATED_FETCH,
	GET_PAGINATED_FAILURE,
	GET_PAGINATED_SUCCESS,
	CLEANUP_BOURBONS,
} from '../Actions/types';

const initialState = {
	loading: true,
	bourbons: [],
	total_records: 0,
	last_page: 0,
};

export default function bourbons(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case START_PAGINATED_FETCH:
			return {
				...state,
				loading: true,
			};
		case GET_PAGINATED_SUCCESS:
			return {
				...state,
				loading: false,
				bourbons: payload.bourbons,
				total_records: payload.total_records,
				last_page: Math.ceil(payload.total_records / 20),
			};
		case GET_PAGINATED_FAILURE:
			return {
				...state,
				loading: false,
				bourbons: [],
			};
		case CLEANUP_BOURBONS:
			return {
				...state,
				loading: true,
				bourbons: [],
				total_records: 0,
				last_page: 0,
			};
		default:
			return state;
	}
}
