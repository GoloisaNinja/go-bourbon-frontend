import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getUserCollections,
	setCollectionQuicklook,
	cleanupQuicklook,
} from '../../Actions/collections';
import Loading from '../../Components/Loading/Loading';
import Head from '../../Components/Head/Head';
import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import ContentList from '../../Components//ContentList/ContentList';
import ContentDetails from '../../Components/ContentDetails/ContentDetails';
import styles from './CollectionsPage.module.scss';

const CollectionsPage = ({
	collections: { loading, quick_look, collections },
	getUserCollections,
	setCollectionQuicklook,
	cleanupQuicklook,
}) => {
	const textLower = <h1>collections</h1>;
	useEffect(() => {
		const fetchCollections = async () => {
			await getUserCollections();
		};
		fetchCollections();
		return () => {
			cleanupQuicklook();
		};
	}, [getUserCollections, cleanupQuicklook]);

	const handleSetQuicklook = (collection) => {
		setCollectionQuicklook(collection);
	};

	return loading ? (
		<Loading />
	) : (
		<div className={styles.collections_container}>
			<Head
				meta={{
					title: `hello bourbon | Collections Page`,
					description: `hello bourbon Collections | All your collections in one spot!`,
				}}
			/>
			<HeroSplash
				type={`collections`}
				textUpper={`your`}
				textLower={textLower}
			/>
			<section className={styles.collections_section}>
				<ContentList
					content={collections}
					handleSetContent={handleSetQuicklook}
					contentObj={{ type: 'Collection', contentLabel: 'name' }}
				/>
				<ContentDetails contentObject={quick_look} type='Collection' />
			</section>
		</div>
	);
};

CollectionsPage.propTypes = {
	collections: PropTypes.object.isRequired,
	getUserCollections: PropTypes.func.isRequired,
	setCollectionQuicklook: PropTypes.func.isRequired,
	cleanupQuicklook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	collections: state.collections,
});

export default connect(mapStateToProps, {
	getUserCollections,
	setCollectionQuicklook,
	cleanupQuicklook,
})(CollectionsPage);
