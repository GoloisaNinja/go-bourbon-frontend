import { useEffect } from 'react';
import LoginForm from '../../Components/Auth/LoginForm/LoginForm';
import Head from '../../Components/Head/Head';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './LoginPage.module.scss';

const LoginPage = ({ isAuthenticated }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard');
		}
	}, [isAuthenticated, navigate]);
	return (
		<div>
			<Head
				meta={{
					title: `hello bourbon | Login Page`,
					description: `The hello bourbon login page | login and find your next great bourbon adventure!`,
				}}
			/>
			<h1 className={styles.title}>Log(in)</h1>
			<LoginForm />
		</div>
	);
};
LoginPage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(LoginPage);
