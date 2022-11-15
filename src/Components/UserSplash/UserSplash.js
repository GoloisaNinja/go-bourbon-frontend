import styles from './UserSplash.module.scss';

const UserSplash = ({ type, name, category }) => {
	return (
		<div className={styles.img_container}>
			<div className={styles[type]}></div>
			<div className={styles.overlay}>
				<div>
					<h1>{name}</h1>
					<h1>{category}</h1>
				</div>
			</div>
		</div>
	);
};
export default UserSplash;
