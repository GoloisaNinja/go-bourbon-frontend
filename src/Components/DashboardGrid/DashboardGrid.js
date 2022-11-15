import FeatureCard from '../FeatureCard/FeatureCard';
import { GiSquareBottle } from 'react-icons/gi';
import { MdOutlineCollectionsBookmark, MdLaptopMac } from 'react-icons/md';
import { SiAwesomelists } from 'react-icons/si';
import styles from './DashboardGrid.module.scss';

const DashboardGrid = () => {
	const featureArray = [
		{
			id: 112,
			icon: GiSquareBottle,
			title: 'Explore the Bourbons!',
			content: `Go on an adventure and find your next
      obsession!`,
			btnObj: {
				path: `/bourbons?sort=title_asc`,
				text: `Explore`,
			},
		},
		{
			id: 221,
			icon: MdOutlineCollectionsBookmark,
			title: `Visit all your Collections!`,
			content: `Create and manage your collections here.`,
			btnObj: {
				path: `/collections`,
				text: `Your Collections`,
			},
		},
		{
			id: 332,
			icon: SiAwesomelists,
			title: `Your Wishlists aren't going to share themselves!`,
			content: `Create, manage, and share your wishlists here.`,
			btnObj: {
				path: `/wishlists`,
				text: `Your Wishlists`,
			},
		},
		{
			id: 443,
			icon: MdLaptopMac,
			title: `All your Reviews in one spot!`,
			content: `Manage and edit the reviews you've posted to various bourbons across the site from here.`,
			btnObj: {
				path: `/reviews`,
				text: `Your Reviews`,
			},
		},
	];
	return (
		<div className={styles.dash_grid}>
			{featureArray.map((feature) => (
				<FeatureCard
					key={feature.id}
					feature={feature}
					btnObj={feature.btnObj}
				/>
			))}
		</div>
	);
};
export default DashboardGrid;
