import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';

const PrivateRoute = ({ auth }) => {
	const { loading, isAuthenticated } = auth;
	return loading ? (
		<Loading />
	) : isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate replace to='/login' />
	);
};
PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
