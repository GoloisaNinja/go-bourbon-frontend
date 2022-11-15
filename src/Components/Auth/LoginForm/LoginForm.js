import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../../Actions/auth';
import styles from './LoginForm.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';

const LoginForm = ({ loginUser }) => {
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();
	const guestPass = process.env.REACT_APP_GUEST_PASSWORD;
	const handleSubmit = (e) => {
		e.preventDefault();
		smoothscroll.polyfill();
		const { email, password } = formData;
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		navigate('/dashboard');
		loginUser(email, password);
	};
	const handleLoginAsGuest = () => {
		navigate('/dashboard');
		loginUser('bourb_guest@guest.com', guestPass);
	};
	return (
		<div className={styles.form_wrapper}>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label>Email</label>
				<input
					type='email'
					required
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<label>Password</label>
				<input
					type='password'
					required
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
				/>
				<button type='submit'>login</button>
			</form>
			<div>
				<p>No account?</p>
				<Link to='/register'>Register here</Link>
			</div>
			<div>
				<p>Accounts give you the heeby jeebies?</p>
				<button onClick={() => handleLoginAsGuest()}>login as guest</button>
			</div>
		</div>
	);
};
LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(LoginForm);
