import BourbonCard from '../BourbonCard/BourbonCard';
import styles from './BourbonsGrid.module.scss';

const BourbonGrid = ({ bourbons }) => {
	return (
		<>
			{bourbons.length > 0 ? (
				<>
					<div className={styles.grid}>
						{bourbons.map((bourbon) => (
							<BourbonCard key={bourbon._id} bourbon={bourbon} />
						))}
					</div>
				</>
			) : (
				<div className={styles.no_bourbons_container}>
					<div>
						<h1>No bourbons found...</h1>
						<h3>Maybe try searching for:</h3>
					</div>

					<ul>
						<li>A bourbon by distiller</li>
						<li>A bourbon by bottler</li>
						<li>Try a common search term like "bond"</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default BourbonGrid;
