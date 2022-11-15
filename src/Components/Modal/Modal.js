import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from './Modal.module.scss';

const Modal = ({ contents }) => {
	const { component, handleModal, details } = contents;
	const WrappedComponent = component;
	return (
		<>
			<div className={styles.modal_container}>
				<IoCloseCircleOutline onClick={(e) => handleModal()} />
				<WrappedComponent handleModal={handleModal} details={details} />
			</div>
			<div className={styles.overlay} onClick={(e) => handleModal()}></div>
		</>
	);
};
export default Modal;
