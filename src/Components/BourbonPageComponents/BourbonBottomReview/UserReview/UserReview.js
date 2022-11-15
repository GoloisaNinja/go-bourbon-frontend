import styles from './UserReview.module.scss';

const UserReview = ({ review }) => {
	const date = new Date(review.createdAt);
	const [month, day, year] = [
		date.getMonth(),
		date.getDate(),
		date.getFullYear(),
	];
	return (
		<div className={styles.user_review}>
			<div>
				<div>
					<h2>{review.reviewTitle}</h2>
					<div>
						<p>by {review.user.username}</p>
						<p>on {`${day}/${month + 1}/${year}`}</p>
					</div>
				</div>
				<p>{review.reviewScore}</p>
			</div>
			<div className={styles.review_text}>{review.reviewText}</div>
		</div>
	);
};

export default UserReview;
