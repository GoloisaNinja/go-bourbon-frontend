import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import ContentForm from '../ContentForm/ContentForm';
import Modal from '../Modal/Modal';
import ConfirmCancel from '../Modal/ConfirmCancel';
import styles from './ContentDetails.module.scss';

const ContentDetails = ({ contentObject, type }) => {
	const [show, setShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [bourbonToDelete, setBourbonToDelete] = useState({});
	const handleModal = () => {
		setShow(!show);
	};
	const handleEditModal = () => {
		setShowEdit(!showEdit);
	};
	const handleDeleteBourbonModal = () => {
		setShowDelete(!showDelete);
	};
	const handleDeleteBourbon = (id, title) => {
		setBourbonToDelete({ id, title });
		handleDeleteBourbonModal();
	};

	return (
		<div className={styles.container}>
			{contentObject ? (
				<>
					<div>
						<h1>Quick Look</h1>
						<div>
							<HiOutlinePencil onClick={() => handleEditModal()} />
							<HiOutlineTrash onClick={() => handleModal()} />
						</div>
					</div>
					<div className={styles.details_container}>
						<div>
							<div>
								<p>{contentObject.bourbons.length}</p>
							</div>
							<Link
								className={
									contentObject.bourbons.length > 0
										? styles.active
										: styles.disabled
								}
								to={
									type === 'Collection'
										? `/collections/${contentObject._id}`
										: `/wishlists/${contentObject._id}`
								}>
								{`Go to ${type}`}
							</Link>
						</div>
						<div>
							<h3>{contentObject.name}</h3>
							{contentObject.bourbons.length > 0 ? (
								<ul>
									{contentObject.bourbons.map((bourbon) => (
										<li key={bourbon._id}>
											<Link to={`/bourbons/${bourbon._id}`}>
												{bourbon.title}
											</Link>
											<HiOutlineTrash
												onClick={() =>
													handleDeleteBourbon(bourbon._id, bourbon.title)
												}
											/>
										</li>
									))}
								</ul>
							) : (
								<>
									<p>{`${type} is empty! Go add some bourbons!`}</p>
									<Link
										className={styles.btn_explore}
										to={`/bourbons?sort=title_asc`}>
										Go Explore!
									</Link>
								</>
							)}
						</div>
					</div>
				</>
			) : (
				<div>
					<h1>{`Select a ${type.toLowerCase()} from your list...`}</h1>
				</div>
			)}
			{show && (
				<Modal
					contents={{
						component: ConfirmCancel,
						handleModal: handleModal,
						details: {
							content: {
								type: type,
								id: contentObject._id,
								name: contentObject.name,
							},
						},
					}}
				/>
			)}
			{showEdit && (
				<Modal
					contents={{
						component: ContentForm,
						handleModal: handleEditModal,
						details: { isEdit: true, type: type },
					}}
				/>
			)}
			{showDelete && (
				<Modal
					contents={{
						component: ConfirmCancel,
						handleModal: handleDeleteBourbonModal,
						details: {
							content: {
								type: `${type}-`,
								id: bourbonToDelete.id,
								name: bourbonToDelete.title,
							},
						},
					}}
				/>
			)}
		</div>
	);
};

export default ContentDetails;
