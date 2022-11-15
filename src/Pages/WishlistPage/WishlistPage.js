import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserWishlistById, cleanupWishlist } from '../../Actions/wishlists';
import UserSplash from '../../Components/UserSplash/UserSplash';
import Search from '../../Components/Search/Search';
import Loading from '../../Components/Loading/Loading';
import Head from '../../Components/Head/Head';
import BourbonsGrid from '../../Components/BourbonsGrid/BourbonsGrid';
import styles from './WishlistPage.module.scss';

const WishlistPage = ({
	wishlists: {
		wishlist: { loading, wishlist },
	},
	getUserWishlistById,
	cleanupWishlist,
}) => {
	const params = useParams();
	const wishlistId = params.wishlistId;
	const [searchTerm, setSearchTerm] = useState('');
	const [meta, setMeta] = useState({});
	useEffect(() => {
		const fetchWishlist = async () => {
			const response = await getUserWishlistById(wishlistId);
			setMeta(response);
		};
		fetchWishlist();
		return () => {
			cleanupWishlist();
		};
	}, [getUserWishlistById, wishlistId, cleanupWishlist]);
	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
	};
	const bourbonsToDisplay = wishlist?.bourbons.filter((bourbon) =>
		bourbon.title.toLowerCase().includes(searchTerm)
	);
	return loading ? (
		<Loading />
	) : (
		<div className={styles.container}>
			<Head meta={meta} />
			{/* <h1>
				{wishlist.name} <span> 🥃</span>
			</h1> */}
			<UserSplash
				type={'bourbons'}
				name={wishlist.name}
				category={'wishlist'}
			/>
			<Search handleSearch={handleSearch} />
			<BourbonsGrid bourbons={bourbonsToDisplay} />
		</div>
	);
};
WishlistPage.propTypes = {
	wishlists: PropTypes.object.isRequired,
	getUserWishlistById: PropTypes.func.isRequired,
	cleanupWishlist: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	wishlists: state.wishlists,
});
export default connect(mapStateToProps, {
	getUserWishlistById,
	cleanupWishlist,
})(WishlistPage);
