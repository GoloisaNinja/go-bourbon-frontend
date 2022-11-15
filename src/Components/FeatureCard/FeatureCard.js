import { useNavigate } from 'react-router-dom';
import styles from './FeatureCard.module.scss';

const FeatureCard = ({ feature, btnObj, borders }) => {
	const navigate = useNavigate();
	const { icon, title, content } = feature;
	const Icon = icon;
	return (
		<div className={borders ? styles.container : styles.container_noborders}>
			<div>
				<Icon />
			</div>
			<h1>{title}</h1>
			<p>{content}</p>
			{btnObj && (
				<button onClick={() => navigate(btnObj.path)}>{btnObj.text}</button>
			)}
		</div>
	);
};

export default FeatureCard;
