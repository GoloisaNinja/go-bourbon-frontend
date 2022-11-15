import styles from './HeroSplash.module.scss';

const HeroSplash = ({ type, textUpper, textLower }) => {
	return (
		<div className={styles.img_container}>
			<div className={styles[type]}></div>
			<div className={styles.overlay}>
				<div>
					<h1>{textUpper}</h1>
					{/* <h1>{textLower}</h1> */}
					{textLower}
				</div>
			</div>
		</div>
	);
};
export default HeroSplash;
