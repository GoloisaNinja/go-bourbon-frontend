import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import {
	HiOutlineSortAscending,
	HiOutlineSortDescending,
} from 'react-icons/hi';
import styles from './BourbonsPageFilters.module.scss';

const BourbonsPageFilters = ({ handleSort }) => {
	const location = useLocation();
	const [expand, setExpand] = useState(false);
	const [sortBy, setSortBy] = useState('title');
	const [sortDirection, setSortDirection] = useState('');
	const handleClick = (e) => {
		setSortBy(e.target.name);
		handleSort(e.target.name, sortDirection);
	};
	const handleExpand = () => {
		setExpand(!expand);
	};
	const handleDirection = () => {
		let directionToSend;
		if (sortDirection === 'asc') {
			setSortDirection('desc');
			directionToSend = 'desc';
		} else {
			setSortDirection('asc');
			directionToSend = 'asc';
		}
		handleSort(sortBy, directionToSend);
	};
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const sortArray = params.get('sort').split('_');
		setSortBy(sortArray[0]);
		setSortDirection(sortArray[1]);
	}, [location]);
	return (
		<div className={styles.container}>
			<div>
				<h2>Sort</h2>
				<FaChevronRight
					onClick={() => handleExpand()}
					className={expand ? styles.expand : null}
				/>
			</div>
			<div className={expand ? styles.expand : null}>
				<button
					className={sortBy === 'title' ? styles.active : null}
					name='title'
					onClick={(e) => handleClick(e)}>
					title
				</button>
				<button
					className={sortBy === 'abv' ? styles.active : null}
					name='abv'
					onClick={(e) => handleClick(e)}>
					abv
				</button>{' '}
				<button
					className={sortBy === 'distiller' ? styles.active : null}
					name='distiller'
					onClick={(e) => handleClick(e)}>
					distiller
				</button>{' '}
				<button
					className={sortBy === 'bottler' ? styles.active : null}
					name='bottler'
					onClick={(e) => handleClick(e)}>
					bottler
				</button>{' '}
				<button
					className={sortBy === 'score' ? styles.active : null}
					name='score'
					onClick={(e) => handleClick(e)}>
					score
				</button>{' '}
				<button
					className={sortBy === 'age' ? styles.active : null}
					name='age'
					onClick={(e) => handleClick(e)}>
					age
				</button>{' '}
				<button
					className={sortBy === 'price' ? styles.active : null}
					name='price'
					onClick={(e) => handleClick(e)}>
					price
				</button>
				<button
					className={styles.sortDirection}
					onClick={() => handleDirection()}>
					{sortDirection === 'asc' ? (
						<HiOutlineSortAscending />
					) : (
						<HiOutlineSortDescending />
					)}
				</button>
			</div>
		</div>
	);
};
export default BourbonsPageFilters;
