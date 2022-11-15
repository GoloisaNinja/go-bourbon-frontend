import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getUserWishlists,
	setWishlistQuicklook,
	cleanupQuicklook,
} from '../../Actions/wishlists';
import Loading from '../../Components/Loading/Loading';
import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import ContentList from '../../Components//ContentList/ContentList';
import ContentDetails from '../../Components/ContentDetails/ContentDetails';
import Head from '../../Components/Head/Head';
import styles from './WishlistsPage.module.scss';

const WishlistsPage = ({
	wishlists: { loading, quick_look, wishlists },
	getUserWishlists,
	setWishlistQuicklook,
	cleanupQuicklook,
}) => {
	const textLower = <h1>wishlists</h1>;
	useEffect(() => {
		const fetchWishlists = async () => {
			await getUserWishlists();
		};
		fetchWishlists();
		return () => {
			cleanupQuicklook();
		};
	}, [getUserWishlists, cleanupQuicklook]);

	const handleSetQuicklook = (wishlist) => {
		setWishlistQuicklook(wishlist);
	};

	return loading ? (
		<Loading />
	) : (
		<div className={styles.wishlists_container}>
			<Head
				meta={{
					title: `hello bourbon | Wishlists Page`,
					description: `hello bourbon Wishlists | All your greatest bourbon wishes in one spot!`,
				}}
			/>
			<HeroSplash type={`wishlists`} textUpper={`your`} textLower={textLower} />
			<section className={styles.wishlists_section}>
				<ContentList
					content={wishlists}
					handleSetContent={handleSetQuicklook}
					contentObj={{ type: 'Wishlist', contentLabel: 'name' }}
				/>
				<ContentDetails contentObject={quick_look} type='Wishlist' />
			</section>
		</div>
	);
};

WishlistsPage.propTypes = {
	wishlists: PropTypes.object.isRequired,
	getUserWishlists: PropTypes.func.isRequired,
	setWishlistQuicklook: PropTypes.func.isRequired,
	cleanupQuicklook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	wishlists: state.wishlists,
});

export default connect(mapStateToProps, {
	getUserWishlists,
	setWishlistQuicklook,
	cleanupQuicklook,
})(WishlistsPage);
