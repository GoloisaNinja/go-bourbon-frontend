import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BourbonCard.module.scss';
const BourbonCard = ({ bourbon }) => {
	const { _id, image, title, bottler, distiller, abv, age } = bourbon;
	const backupImage =
		'https://whiskeyraiders.com/wp-content/themes/m2019-w/images/default.jpg';
	const navigate = useNavigate();
	const location = useLocation();
	const handleNavigate = () => {
		navigate(`/bourbons/${_id}`, {
			state: {
				navFrom: `${location.pathname}${location.search}`,
				pageScrollPos: window.pageYOffset,
			},
		});
	};
	const handleBackupImage = (e) => {
		e.target.onError = null;
		e.target.src = backupImage;
	};
	return (
		<div className={styles.card_container}>
			<div className={styles.image_container}>
				<img
					className={styles.image}
					src={image}
					onError={(e) => handleBackupImage(e)}
					alt={`bourbon ${title}`}
				/>
				<div className={styles.score_container}>
					<p>{bourbon.review.score ? bourbon.review.score : '?'}</p>
				</div>
			</div>
			<div className={styles.card_container_lower}>
				<div className={styles.card_title}>
					<h2>{title}</h2>
				</div>
				<div className={styles.card_details}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>bottler</th>
								<th>distiller</th>
								<th>abv</th>
								<th>age</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{bottler}</td>
								<td>{distiller}</td>
								<td>{abv ? abv : 'unk'}</td>
								<td>{age}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className={styles.card_button}>
					<button
						className={styles.bourbon_button}
						onClick={() => handleNavigate()}>
						See More
					</button>
				</div>
			</div>
		</div>
	);
};
export default BourbonCard;
