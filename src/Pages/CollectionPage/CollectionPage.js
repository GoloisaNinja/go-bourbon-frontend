import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getUserCollectionById,
	cleanupCollection,
} from '../../Actions/collections';
import UserSplash from '../../Components/UserSplash/UserSplash';
import Search from '../../Components/Search/Search';
import Loading from '../../Components/Loading/Loading';
import Head from '../../Components/Head/Head';
import BourbonsGrid from '../../Components/BourbonsGrid/BourbonsGrid';
import styles from './CollectionPage.module.scss';

const CollectionPage = ({
	collections: {
		collection: { loading, collection },
	},
	getUserCollectionById,
	cleanupCollection,
}) => {
	const params = useParams();
	const collectionId = params.collectionId;
	const [searchTerm, setSearchTerm] = useState('');
	//const [meta, setMeta] = useState({});
	useEffect(() => {
		const fetchCollection = async () => {
			await getUserCollectionById(collectionId);
			//setMeta(response);
		};
		fetchCollection();
		return () => {
			cleanupCollection();
		};
	}, [getUserCollectionById, collectionId, cleanupCollection]);
	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
	};
	const bourbonsToDisplay = collection?.bourbons.filter((bourbon) =>
		bourbon.title.toLowerCase().includes(searchTerm)
	);
	return loading ? (
		<Loading />
	) : (
		<div className={styles.container}>
			{/* <Head meta={meta} /> */}
			<UserSplash
				type={'bourbons'}
				name={collection.name}
				category={'collection'}
			/>
			<Search handleSearch={handleSearch} />
			<BourbonsGrid bourbons={bourbonsToDisplay} />
		</div>
	);
};
CollectionPage.propTypes = {
	collections: PropTypes.object.isRequired,
	getUserCollectionById: PropTypes.func.isRequired,
	cleanupCollection: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	collections: state.collections,
});
export default connect(mapStateToProps, {
	getUserCollectionById,
	cleanupCollection,
})(CollectionPage);
