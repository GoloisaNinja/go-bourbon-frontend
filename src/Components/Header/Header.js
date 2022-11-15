import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = ({ isAuthenticated, token, logoutUser }) => {
	const guestLinks = (
		<ul>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/bourbons?sort=title_asc'>Bourbons</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	const authLinks = (
		<ul>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/bourbons?sort=title_asc'>Bourbons</Link>
			</li>
			<li>
				<Link to='/dashboard'>Dashboard</Link>
			</li>
		</ul>
	);
	return (
		<header className={styles.header_container}>
			{isAuthenticated ? authLinks : guestLinks}
		</header>
	);
};
Header.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	token: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	token: state.auth.token,
});
export default connect(mapStateToProps)(Header);
