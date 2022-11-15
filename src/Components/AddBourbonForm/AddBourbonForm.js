import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addBourbontoUserCollection } from '../../Actions/collections';
import { addBourbontoUserWishlist } from '../../Actions/wishlists';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './AddBourbonForm.module.scss';

const AddBourbonForm = ({
	handleModal,
	collections,
	bourbon,
	addBourbontoUserCollection,
	addBourbontoUserWishlist,
	wishlists,
	details,
}) => {
	const [content, setContent] = useState(undefined);
	const [validContentArray, setValidContentArray] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		let contentArray = [];
		if (details.type === 'Collection') {
			contentArray = collections;
		} else {
			contentArray = wishlists;
		}
		if (contentArray.length > 0) {
			let arr = [
				{
					_id: '0',
					[`${details.type.toLowerCase()}_id`]: 'placeholder',
					[`${details.type.toLowerCase()}_name`]: 'select...',
				},
			];
			for (let i = 0; i < contentArray.length; i++) {
				if (
					!contentArray[i].bourbons.some(
						(userbourbon) => userbourbon.bourbon_id === bourbon._id
					)
				) {
					arr.push(contentArray[i]);
				}
			}
			setValidContentArray(arr);
		}
	}, [bourbon._id, collections, details.type, wishlists]);
	const handleSelectContent = (e) => {
		setContent(e.target.value);
	};
	const handleNavigate = () => {
		if (details.type === 'Collection') {
			navigate('/collections');
		} else {
			navigate('/wishlists');
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		smoothscroll.polyfill();
		if (details.type === 'Collection') {
			addBourbontoUserCollection(content, bourbon._id);
		} else {
			addBourbontoUserWishlist(content, bourbon._id);
		}

		handleModal();
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};
	return (
		<div className={styles.form_container}>
			<h1>{`Add Bourbon to ${details.type}`}</h1>
			{validContentArray.length > 1 ? (
				<form onSubmit={(e) => handleSubmit(e)}>
					<label>{`Select a ${details.type}`}</label>
					<select
						value={content}
						name='content'
						onChange={(e) => handleSelectContent(e)}>
						{validContentArray.map((content) => (
							<option
								key={content._id}
								value={content[`${details.type.toLowerCase()}_id`]}>
								{content[`${details.type.toLowerCase()}_name`]}
							</option>
						))}
					</select>
					<button
						disabled={content === undefined || content === 'placeholder'}
						type='submit'>
						{`add to ${details.type.toLowerCase()}`}
					</button>
				</form>
			) : (
				<div className={styles.empty_container}>
					<h3>{`No available ${details.type.toLowerCase()}s...`}</h3>
					<p>
						{`This bourbon either exists in all your ${details.type.toLowerCase()}s, or you may not
						have any ${details.type.toLowerCase()}s yet.`}
					</p>
					<button onClick={() => handleNavigate()}>
						{`Manage ${details.type}`}
					</button>
				</div>
			)}
		</div>
	);
};
AddBourbonForm.propTypes = {
	collections: PropTypes.array,
	wishlists: PropTypes.array,
	bourbon: PropTypes.object.isRequired,
	addBourbontoUserCollection: PropTypes.func.isRequired,
	addBourbontoUserWishlist: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	collections: state.auth.user.collections,
	wishlists: state.auth.user.wishlists,
	bourbon: state.bourbon.bourbon,
});
export default connect(mapStateToProps, {
	addBourbontoUserCollection,
	addBourbontoUserWishlist,
})(AddBourbonForm);
