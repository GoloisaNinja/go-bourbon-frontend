import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getUserBourbonReviews,
	setDashboardReview,
	cleanupReviews,
} from '../../Actions/review';
import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import ContentList from '../../Components/ContentList/ContentList';
import ReviewDetails from '../../Components/ReviewsPageComponents/ReviewDetails/ReviewDetails';
import Loading from '../../Components/Loading/Loading';
import Head from '../../Components/Head/Head';
import styles from './ReviewsPage.module.scss';

const ReviewsPage = ({
	user: { _id },
	reviews: { loading, review, reviews },
	getUserBourbonReviews,
	setDashboardReview,
	cleanupReviews,
}) => {
	useEffect(() => {
		getUserBourbonReviews(_id);

		// clean up reviews function

		return () => cleanupReviews();
	}, [_id, getUserBourbonReviews, cleanupReviews]);

	const handleSetReview = (review) => {
		setDashboardReview(review);
	};

	const textLower = <h1>reviews</h1>;

	return loading ? (
		<Loading />
	) : (
		<div className={styles.reviews_container}>
			<Head
				meta={{
					title: `hello bourbon | Reviews Page`,
					description: `hello bourbon Reviews | All your reviews in one spot!`,
				}}
			/>
			<HeroSplash type={`reviews`} textUpper={`your`} textLower={textLower} />
			<section className={styles.reviews_section}>
				<ContentList
					content={reviews}
					handleSetContent={handleSetReview}
					contentObj={{ type: 'Review', contentLabel: 'reviewTitle' }}
				/>
				<ReviewDetails review={review} />
			</section>
		</div>
	);
};
ReviewsPage.propTypes = {
	user: PropTypes.object.isRequired,
	reviews: PropTypes.object.isRequired,
	getUserBourbonReviews: PropTypes.func.isRequired,
	setDashboardReview: PropTypes.func.isRequired,
	cleanupReviews: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	user: state.auth.user,
	reviews: state.reviews,
});
export default connect(mapStateToProps, {
	getUserBourbonReviews,
	setDashboardReview,
	cleanupReviews,
})(ReviewsPage);
