import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map((alert) => {
		return (
			<div key={alert.id} className={styles[`alert_${alert.type}`]}>
				{alert.msg}
			</div>
		);
	});
Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
	alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
