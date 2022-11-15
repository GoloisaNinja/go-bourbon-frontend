import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	editUserCollection,
	postUserCollection,
} from '../../Actions/collections';
import { editUserWishlist, postUserWishlist } from '../../Actions/wishlists';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './ContentForm.module.scss';

const ContentForm = ({
	collection,
	wishlist,
	handleModal,
	editUserCollection,
	postUserCollection,
	editUserWishlist,
	postUserWishlist,
	details,
}) => {
	const [collectionName, setCollectionName] = useState(
		details.type === 'Collection' ? (details.isEdit ? collection.name : '') : ''
	);
	const [wishlistName, setWishlistName] = useState(
		details.type === 'Wishlist' ? (details.isEdit ? wishlist.name : '') : ''
	);
	const handleChange = (e, type) => {
		if (type === 'Collection') {
			setCollectionName(e.target.value);
		} else {
			setWishlistName(e.target.value);
		}
	};

	const handleSubmit = (e, type) => {
		e.preventDefault();
		smoothscroll.polyfill();
		if (type === 'Collection') {
			const cleanCollectionName = collectionName.trim();
			const editObj = {
				name: cleanCollectionName,
				isPrivate: true,
			};
			if (details.isEdit) {
				editUserCollection(collection._id, editObj);
			} else {
				postUserCollection(editObj);
			}
		} else {
			const cleanWishlistName = wishlistName.trim();
			const editObj = {
				name: cleanWishlistName,
				isPrivate: true,
			};
			if (details.isEdit) {
				editUserWishlist(wishlist._id, editObj);
			} else {
				postUserWishlist(editObj);
			}
		}

		handleModal();
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};

	return (
		<div className={styles.form_container}>
			<h1>
				{details.type === 'Collection'
					? details.isEdit
						? 'Edit Collection'
						: 'Create Collection'
					: details.isEdit
					? 'Edit Wishlist'
					: 'Create Wishlist'}
			</h1>
			<form onSubmit={(e) => handleSubmit(e, details.type)}>
				<label>{`${details.type} Name`}</label>
				<input
					type='text'
					name='name'
					maxLength='50'
					value={details.type === 'Collection' ? collectionName : wishlistName}
					required
					onChange={(e) => handleChange(e, details.type)}
				/>
				<div className={styles.title_chars}>
					{details.type === 'Collection'
						? 50 - collectionName.length
						: 50 - wishlistName.length}
				</div>
				<button type='submit'>
					{details.isEdit ? 'submit edit' : 'submit'}
				</button>
			</form>
		</div>
	);
};
ContentForm.propTypes = {
	collection: PropTypes.object,
	wishlist: PropTypes.object,
	editUserCollection: PropTypes.func.isRequired,
	postUserCollection: PropTypes.func.isRequired,
	editUserWishlist: PropTypes.func.isRequired,
	postUserWishlist: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	collection: state.collections.quick_look,
	wishlist: state.wishlists.quick_look,
});
export default connect(mapStateToProps, {
	editUserCollection,
	postUserCollection,
	editUserWishlist,
	postUserWishlist,
})(ContentForm);
