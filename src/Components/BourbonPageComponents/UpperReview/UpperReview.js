import { useEffect, useState } from 'react';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import styles from './UpperReview.module.scss';

const UpperReview = ({ review }) => {
	const [cleanReview, setCleanReview] = useState({});

	// LOOKS FOR NULL SECTIONS OF REVIEW DATA AND
	// OVERWRITES WITH A NOT REVIEWED STRING

	useEffect(() => {
		const noData = `This section of the review is incomplete or has not been reviewed yet...`;
		let reviewObj = {};
		for (const [key, value] of Object.entries(review)) {
			if (review[key] === null) {
				reviewObj[key] = noData;
			} else {
				reviewObj[key] = value;
			}
		}
		setCleanReview(reviewObj);
	}, [setCleanReview, review]);

	return (
		<div className={styles.review_container}>
			<h1>
				<ImQuotesLeft /> {cleanReview.intro} <ImQuotesRight />{' '}
				{cleanReview.author !==
					'This section of the review is incomplete or has not been reviewed yet...' && (
					<span
						className={
							styles.credit
						}>{`Reviewed by ${cleanReview.author}`}</span>
				)}
			</h1>
			<h2 className={styles.section_text}>
				<span className={styles.section_label}>NOSE </span>
				{cleanReview.nose}
			</h2>
			<h2 className={styles.section_text}>
				<span className={styles.section_label}>TASTE </span>
				{cleanReview.taste}
			</h2>
			<h2 className={styles.section_text}>
				<span className={styles.section_label}>FINISH </span>
				{cleanReview.finish}
			</h2>
			<h2 className={styles.section_text}>
				<span className={`${styles.section_label} ${styles.overall}`}>
					OVERALL{' '}
				</span>
				{cleanReview.overall}
			</h2>
		</div>
	);
};
export default UpperReview;
