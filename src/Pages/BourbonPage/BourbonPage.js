import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getSingleBourbon, cleanUpBourbon } from '../../Actions/bourbon';
import { getBourbonReviews } from '../../Actions/review';
import Modal from '../../Components/Modal/Modal';
import AddBourbonForm from '../../Components/AddBourbonForm/AddBourbonForm';
import BourbonPricing from '../../Components/BourbonPageComponents/BourbonPricing/BourbonPricing';
import BourbonDetails from '../../Components/BourbonPageComponents/BourbonDetails/BourbonDetails';
import UpperReview from '../../Components/BourbonPageComponents/UpperReview/UpperReview';
import ReviewSection from '../../Components/BourbonPageComponents/BourbonBottomReview/ReviewSection/ReviewSection';
import Loading from '../../Components/Loading/Loading';
//import Head from '../../Components/Head/Head';
import {
	MdErrorOutline,
	MdOutlineCollectionsBookmark,
	MdStarBorder,
} from 'react-icons/md';
import styles from './BourbonPage.module.scss';

const BourbonPage = ({
	loading,
	bourbon,
	getSingleBourbon,
	cleanUpBourbon,
	reviews_loading,
	reviews,
	getBourbonReviews,
	auth,
}) => {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const bourbonId = params.bourbonId;
	const [addType, setAddType] = useState('');
	const [show, setShow] = useState(false);
	const backupImage =
		'https://whiskeyraiders.com/wp-content/themes/m2019-w/images/default.jpg';
	//const [meta, setMeta] = useState({});
	useEffect(() => {
		const fetchBourbonData = async () => {
			await getSingleBourbon(bourbonId);
			//setMeta(response);
			await getBourbonReviews(bourbonId);
		};
		fetchBourbonData();

		// clean up function
		return () => cleanUpBourbon();
	}, [bourbonId, getSingleBourbon, getBourbonReviews, cleanUpBourbon]);

	const handleModal = (type) => {
		setAddType(type);
		setShow(!show);
	};

	const handleShop = () => {
		const shopquery = encodeURIComponent(bourbon.title);
		const caskersbaseurl = 'https://www.caskers.com/catalogsearch/result/?q=';
		window.open(`${caskersbaseurl}${shopquery}`);
	};
	const handleGoBack = () => {
		if (location.state !== null) {
			navigate(location.state.navFrom, {
				state: {
					pageScrollPos: location.state.pageScrollPos,
				},
			});
		} else {
			navigate(-1);
		}
	};
	const handleBackupImage = (e) => {
		e.target.onError = null;
		e.target.src = backupImage;
	};
	return loading ? (
		<Loading />
	) : bourbon ? (
		<div className={styles.container}>
			{/* <Head meta={meta} /> */}
			<button onClick={() => handleGoBack()}>Go Back</button>
			<div className={styles.details_wrapper}>
				<h1 className={styles.title}>{bourbon.title}</h1>
				<BourbonPricing
					pricingArray={bourbon.price_array}
					handleShop={handleShop}
				/>
				{auth.isAuthenticated && (
					<span className={styles.actions_group}>
						<MdOutlineCollectionsBookmark
							onClick={() => handleModal('Collection')}
						/>
						<MdStarBorder onClick={() => handleModal('Wishlist')} />
					</span>
				)}
			</div>
			<div className={styles.lower_container}>
				<div className={styles.score_container}>
					<p>{bourbon.review.score ? bourbon.review.score : '?'}</p>
					{/* <p>review score</p> */}
				</div>
				<img
					src={bourbon.image}
					alt={`A bottle of ${bourbon.title} or a default whiskey background`}
					onError={(e) => handleBackupImage(e)}
				/>
				<BourbonDetails
					abv={bourbon.abv}
					age={bourbon.age}
					bottler={bourbon.bottler}
					distiller={bourbon.distiller}
				/>
				<UpperReview review={bourbon.review} />
				{reviews_loading ? (
					<div>
						<h2>loading...</h2>
					</div>
				) : (
					<ReviewSection reviews={reviews} />
				)}
			</div>
			{show && (
				<Modal
					contents={{
						component: AddBourbonForm,
						handleModal: handleModal,
						details: { type: addType },
					}}
				/>
			)}
		</div>
	) : (
		<div className={styles.not_found}>
			<button onClick={(e) => navigate(-1)}>Go Back</button>
			<h1>
				<MdErrorOutline />
				Uh oh!
			</h1>
			<h2>Bourbon not found...</h2>
		</div>
	);
};

BourbonPage.propTypes = {
	loading: PropTypes.bool.isRequired,
	bourbon: PropTypes.object,
	getSingleBourbon: PropTypes.func.isRequired,
	cleanUpBourbon: PropTypes.func.isRequired,
	reviews_loading: PropTypes.bool.isRequired,
	reviews: PropTypes.array.isRequired,
	auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
	loading: state.bourbon.loading,
	bourbon: state.bourbon.bourbon,
	reviews_loading: state.bourbon.user_reviews.loading,
	reviews: state.bourbon.user_reviews.reviews,
	auth: state.auth,
});
export default connect(mapStateToProps, {
	getSingleBourbon,
	cleanUpBourbon,
	getBourbonReviews,
})(BourbonPage);
