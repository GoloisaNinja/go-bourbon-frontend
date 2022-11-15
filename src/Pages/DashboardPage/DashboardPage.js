import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import DashboardGrid from '../../Components/DashboardGrid/DashboardGrid';
import Head from '../../Components/Head/Head';
import { logoutUser } from '../../Actions/auth';
import styles from './DashboardPage.module.scss';

const DashboardPage = ({ user, logoutUser }) => {
	const textLower = <h1>{user.username}</h1>;
	return (
		<div className={styles.container}>
			<Head
				meta={{
					title: `hello bourbon | ${user.username} Dashboard`,
					description: `Welcome to your hello bourbon dashboard ${user.username}!`,
				}}
			/>
			<HeroSplash type={'dash'} textUpper={'hello'} textLower={textLower} />
			<DashboardGrid />
			<div className={styles.leaving}>
				<h2>Leaving us so soon? Hurry back, ok?</h2>
				<button onClick={(e) => logoutUser()}>Logout</button>
			</div>
		</div>
	);
};
DashboardPage.propTypes = {
	user: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	user: state.auth.user,
});
export default connect(mapStateToProps, { logoutUser })(DashboardPage);
