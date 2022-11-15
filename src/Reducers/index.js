import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import bourbons from './bourbons';
import bourbon from './bourbon';
import reviews from './reviews';
import collections from './collections';
import wishlists from './wishlists';

export default combineReducers({
	alert,
	auth,
	bourbons,
	bourbon,
	reviews,
	collections,
	wishlists,
});
