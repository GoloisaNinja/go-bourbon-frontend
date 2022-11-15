import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';

const ScrollToTop = ({ bourbonLoadingState }) => {
	const routePath = useLocation();
	useEffect(() => {
		if (typeof window !== undefined) {
			smoothscroll.polyfill();
			if (routePath.pathname === '/bourbons') {
				if (!bourbonLoadingState && routePath.state) {
					window.scroll({
						top: routePath.state.pageScrollPos,
						left: 0,
					});
				} else if (routePath.state === null) {
					window.scroll({ top: 0, left: 0, behavior: 'smooth' });
				}
			} else {
				window.scroll({ top: 0, left: 0, behavior: 'smooth' });
			}
		}
	}, [routePath, bourbonLoadingState]);
	return null;
};

ScrollToTop.propTypes = {
	bourbonLoadingState: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	bourbonLoadingState: state.bourbons.loading,
});
export default connect(mapStateToProps)(ScrollToTop);
