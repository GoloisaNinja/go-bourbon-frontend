import { useState } from 'react';
import UserReview from '../UserReview/UserReview';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewForm from '../ReviewForm/ReviewForm';
import Modal from '../../../Modal/Modal';
import { MdAddCircleOutline, MdLaptopMac } from 'react-icons/md';
import styles from './ReviewSection.module.scss';

const ReviewSection = ({ reviews, userId, isAuthenticated }) => {
	const alreadyReviewed = reviews.filter((review) => review.user.id === userId);
	const [show, setShow] = useState(false);
	const handleModal = () => {
		setShow(!show);
	};
	return (
		<>
			<section className={styles.user_review_container}>
				<div>
					<h1 className={styles.user_review_header}>
						User Reviews <MdLaptopMac />
					</h1>
					{isAuthenticated && !alreadyReviewed.length && (
						<button onClick={(e) => handleModal()}>
							<MdAddCircleOutline /> Review
						</button>
					)}
				</div>
				{reviews.length ? (
					reviews.map((review) => (
						<UserReview key={review._id} review={review} />
					))
				) : (
					<h2>No user reviews...</h2>
				)}
				{show && (
					<Modal
						contents={{
							component: ReviewForm,
							handleModal,
							details: { isEdit: false },
						}}
					/>
				)}
			</section>
		</>
	);
};

ReviewSection.propTypes = {
	userId: PropTypes.string,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	userId: state.auth.user._id,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(ReviewSection);
