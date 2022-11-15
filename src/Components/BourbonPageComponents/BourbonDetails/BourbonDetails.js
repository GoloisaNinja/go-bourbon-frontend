import FeatureCard from '../../FeatureCard/FeatureCard';
import { GiCellarBarrels, GiSquareBottle } from 'react-icons/gi';
import { FaGlassWhiskey, FaRegCalendarAlt } from 'react-icons/fa';
import styles from './BourbonDetails.module.scss';

const BourbonDetails = ({ abv, age, bottler, distiller }) => {
	return (
		<div className={styles.card_grid}>
			<FeatureCard
				feature={{
					icon: FaGlassWhiskey,
					title: abv ? abv : 'unknown',
					content: 'ABV',
				}}
			/>
			<FeatureCard
				feature={{
					icon: FaRegCalendarAlt,
					title: age,
					content: 'Age',
				}}
			/>
			<FeatureCard
				feature={{
					icon: GiSquareBottle,
					title: bottler,
					content: 'Bottled By',
				}}
			/>
			<FeatureCard
				feature={{
					icon: GiCellarBarrels,
					title: distiller,
					content: 'The Distiller',
				}}
			/>
		</div>
	);
};
export default BourbonDetails;
