import axios from 'axios';
const prod = false;
const configObject = {
	prod: {
		url: 'https://bourbon-backend.onrender.com/api',
		//apiKey: process.env.REACT_APP_BOURBON_PROD_API_KEY,
	},
	dev: {
		url: 'http://localhost:5000/api',
		//apiKey: process.env.REACT_APP_BOURBONAPI_KEY,
	},
};
const baseURL = prod ? configObject.prod.url : configObject.dev.url;
// TODO - look at adding api key security to Go Api
//const apikey = prod ? configObject.prod.apiKey : configObject.dev.apiKey;

// Bourbon Calls

// Get paginated Bourbons for the Bourbon Grid

export const getPaginatedBourbons = async (page, search, sort) => {
	try {
		let response = await axios.get(
			`${baseURL}/bourbons?search=${search}&sort=${sort}&page=${page}`
		);
		response = response.data;
		if (response.data.bourbons.length > 0) {
			return response;
		}
	} catch (error) {
		return error.response;
	}
};

// Get a single Bourbon by ID for the Bourbon Page

export const getSingleBourbon = async (id) => {
	try {
		let response = await axios.get(`${baseURL}/bourbons/${id}`);
		response = response.data;
		return response;
	} catch (error) {
		return error.response;
	}
};

// Reviews Calls

// Get All Reviews for the Individual Bourbon page

export const getBourbonReviews = async (id) => {
	try {
		let response = await axios.get(`${baseURL}/reviews/bourbon/${id}`);
		response = response.data;
		return response;
	} catch (error) {
		return error.response;
	}
};

// Get All Reviews for the Dashboard Reviews Page based on user ID

export const getUserBourbonReviews = async (id) => {
	try {
		const response = await axios.get(`${baseURL}/reviews/user/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Create a review for the Individual Bourbon page

export const postBourbonReview = async (formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	const body = formData;
	try {
		const response = await axios.post(`${baseURL}/review`, body, config);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Edit a review from the User's Dashboard Reviews page

export const editUserReview = async (id, formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	const body = formData;
	try {
		const response = await axios.patch(
			`${baseURL}/review/update/${id}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Delete a review from the User's Dashboard Reviews Page

export const deleteUserReview = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.delete(`${baseURL}/review/${id}`, config);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Collection Calls

// Create a new user Collection
export const postUserCollection = async (formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	const body = formData;
	try {
		let response = await axios.post(`${baseURL}/type/collection`, body, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Get all Collections based on authenticated user
export const getUserCollections = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.get(`${baseURL}/type/collections`, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Get single collection for auth user with collection id
export const getUserCollectionById = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.get(`${baseURL}/type/collection/${id}`, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Edit a Collection Name and possibly the privacy flag
export const editUserCollection = async (id, formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	const body = formData;
	try {
		let response = await axios.post(
			`${baseURL}/type/collection/update/${id}`,
			body,
			config
		);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Add a bourbon to user collection based on auth, collection ID and bourbon ID
export const addBourbonToUserCollection = async (collectionId, bourbonId) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	const body = {};
	try {
		let response = await axios.post(
			`${baseURL}/type/collection/add/${collectionId}/${bourbonId}`,
			body,
			config
		);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Delete a bourbon from user collection based on auth, collection ID and bourbon ID
export const deleteBourbonFromUserCollection = async (
	collectionId,
	bourbonId
) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.delete(
			`${baseURL}/type/collection/delete/${collectionId}/${bourbonId}`,
			config
		);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Delete an entire user collection based on user auth and collection ID
export const deleteUserCollection = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.delete(
			`${baseURL}/type/collection/${id}`,
			config
		);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Wishlist Calls

// Create a new user Wishlist
export const postUserWishlist = async (formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	const body = formData;
	try {
		let response = await axios.post(`${baseURL}/type/wishlist`, body, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Get all Wishlists based on authenticated user
export const getUserWishlists = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.get(`${baseURL}/type/wishlists`, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Get single wishlist for auth user with wishlist id
export const getUserWishlistById = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.get(`${baseURL}/type/wishlist/${id}`, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Edit a Wishlist Name and possibly the privacy flag
export const editUserWishlist = async (id, formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	const body = formData;
	try {
		let response = await axios.post(
			`${baseURL}/type/wishlist/update/${id}`,
			body,
			config
		);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Add a bourbon to user wishlist based on auth, wishlist ID and bourbon ID
export const addBourbonToUserWishlist = async (wishlistId, bourbonId) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	const body = {};
	try {
		let response = await axios.post(
			`${baseURL}/type/wishlist/add/${wishlistId}/${bourbonId}`,
			body,
			config
		);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Delete a bourbon from user wishlist based on auth, wishlist ID and bourbon ID
export const deleteBourbonFromUserWishlist = async (wishlistId, bourbonId) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.delete(
			`${baseURL}/type/wishlist/delete/${wishlistId}/${bourbonId}`,
			config
		);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// Delete an entire user wishlist based on user auth and wishlist ID
export const deleteUserWishlist = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	try {
		let response = await axios.delete(`${baseURL}/type/wishlist/${id}`, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

// User Auth Calls

export const loginUser = async (email, password) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ email, password });
	try {
		let response = await axios.post(`${baseURL}/user/login`, body, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};

export const logoutUser = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	};
	const body = {};
	try {
		const response = await axios.post(`${baseURL}/user/logout`, body, config);
		if (response.status === 200) {
			localStorage.removeItem('token');
			return response;
		}
	} catch (error) {
		return error.response.data;
	}
};

export const registerUser = async (formData) => {
	const { username, email, password } = formData;
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};
	const body = JSON.stringify({ username, email, password });
	try {
		let response = await axios.post(`${baseURL}/user`, body, config);
		response = response.data;
		return response;
	} catch (error) {
		return error.response.data;
	}
};
