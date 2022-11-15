import { useState } from 'react';
import Modal from '../../Modal/Modal';
import ConfirmCancel from '../../Modal/ConfirmCancel';
import ReviewForm from '../../BourbonPageComponents/BourbonBottomReview/ReviewForm/ReviewForm';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styles from './ReviewDetails.module.scss';

const ReviewDetails = ({ review }) => {
	const [show, setShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const handleModal = () => {
		setShow(!show);
	};
	const handleEditModal = () => {
		setShowEdit(!showEdit);
	};
	return (
		<div className={styles.details_wrapper}>
			{review ? (
				<div>
					<div>
						<h1>Review Details</h1>
						<div>
							<HiOutlinePencil onClick={(e) => handleEditModal()} />
							<HiOutlineTrash onClick={(e) => handleModal()} />
						</div>
					</div>
					<div>
						<div className={styles.details_upper_card}>
							<p>Bourbon Reviewed</p>
							<p>
								<Link
									className={styles.bourbon_link}
									to={`/bourbons/${review.bourbon_id}`}>
									{review.bourbonName}
								</Link>
							</p>
						</div>
						<div className={styles.details_upper_card}>
							<p>Title</p>
							<p>{review.reviewTitle}</p>
						</div>
						<div className={`${styles.details_upper_card} ${styles.score}`}>
							{/* <p>Score</p> */}
							<p>{review.reviewScore}</p>
						</div>
					</div>
					<div className={styles.details_lower_card}>
						<p>What you said</p>
						<p>{review.reviewText}</p>
					</div>
					{show && (
						<Modal
							contents={{
								component: ConfirmCancel,
								handleModal: handleModal,
								details: {
									content: {
										type: 'Review',
										id: review._id,
										name: review.bourbonName,
									},
								},
							}}
						/>
					)}
					{showEdit && (
						<Modal
							contents={{
								component: ReviewForm,
								handleModal: handleEditModal,
								details: { isEdit: true },
							}}
						/>
					)}
				</div>
			) : (
				<div>
					<h1>Select a review from your list...</h1>
				</div>
			)}
		</div>
	);
};
export default ReviewDetails;
