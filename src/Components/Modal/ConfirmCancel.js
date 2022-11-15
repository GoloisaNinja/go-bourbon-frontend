import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUserReview } from '../../Actions/review';
import {
	deleteUserCollection,
	deleteBourbonFromUserCollection,
} from '../../Actions/collections';
import {
	deleteUserWishlist,
	deleteBourbonFromUserWishlist,
} from '../../Actions/wishlists';
import styles from './ConfirmCancel.module.scss';

const ConfirmCancel = ({
	handleModal,
	details,
	deleteUserReview,
	deleteUserCollection,
	deleteBourbonFromUserCollection,
	collection,
	deleteUserWishlist,
	deleteBourbonFromUserWishlist,
	wishlist,
}) => {
	const { content } = details;
	const regex = /\w+/g;
	const isDeleteType = /-/;
	const handleClick = (e) => {
		if (e.target.value === 'cancel') {
			handleModal();
		} else {
			if (content.type === 'Review') {
				deleteUserReview(content.id);
			} else if (content.type === 'Collection') {
				deleteUserCollection(content.id);
			} else if (content.type === 'Collection-') {
				deleteBourbonFromUserCollection(collection._id, content.id);
			} else if (content.type === 'Wishlist') {
				deleteUserWishlist(content.id);
			} else {
				deleteBourbonFromUserWishlist(wishlist._id, content.id);
			}
			handleModal();
		}
	};
	return (
		<div className={styles.container}>
			{isDeleteType.test(content.type) ? (
				<>
					<h1>Delete Bourbon?</h1>
					<h4>
						Just checking! You really want to delete <span>{content.name}</span>
						{` from your ${content.type.match(regex).join(' ').toLowerCase()}?`}
					</h4>
				</>
			) : (
				<>
					<h1>{`Delete ${content.type}?`}</h1>
					<h4>
						Just checking! You really want to delete your{' '}
						<span>{content.name}</span>
						{` ${content.type.toLowerCase()}?`}
					</h4>
				</>
			)}

			<div>
				<button value='confirm' onClick={(e) => handleClick(e)}>
					confirm
				</button>
				<button value='cancel' onClick={(e) => handleClick(e)}>
					cancel
				</button>
			</div>
		</div>
	);
};
ConfirmCancel.propTypes = {
	deleteUserReview: PropTypes.func.isRequired,
	deleteUserCollection: PropTypes.func.isRequired,
	deleteBourbonFromUserCollection: PropTypes.func.isRequired,
	collection: PropTypes.object,
	deleteUserWishlist: PropTypes.func.isRequired,
	deleteBourbonFromUserWishlist: PropTypes.func.isRequired,
	wishlist: PropTypes.object,
};
const mapStateToProps = (state) => ({
	collection: state.collections.quick_look,
	wishlist: state.wishlists.quick_look,
});
export default connect(mapStateToProps, {
	deleteUserReview,
	deleteUserCollection,
	deleteBourbonFromUserCollection,
	deleteUserWishlist,
	deleteBourbonFromUserWishlist,
})(ConfirmCancel);
