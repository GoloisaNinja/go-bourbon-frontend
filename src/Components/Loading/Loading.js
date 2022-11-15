import loader from '../../images/loading2.gif';
import styles from './Loading.module.scss';

const Loading = () => {
	return (
		<div className={styles.loading_wrapper}>
			<img
				src={loader}
				alt='a loading animation showing glowing lights exploding like fireworks'
			/>
		</div>
	);
};
export default Loading;
