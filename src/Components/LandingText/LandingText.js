import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../FeatureCard/FeatureCard';
import {
	HiOutlineSearchCircle,
	HiOutlineCollection,
	HiOutlineClipboard,
} from 'react-icons/hi';
import styles from './LandingText.module.scss';

const LandingText = () => {
	const navigate = useNavigate();
	const featureArray = [
		{
			icon: HiOutlineSearchCircle,
			title: 'Search over 700 bourbons',
			content: `Filter your search by bottler, title, age, price, and more. Our
			bourbon data contains reviews by Whiskey Raiders to help you find
			your next bourbon obsession.`,
		},
		{
			icon: HiOutlineCollection,
			title: 'Create your digital collection',
			content: `Sign In or Register for an account to create your digital collection
			of bourbons. Mirror your IRL collection. Ensure you never forget all
			the amazing bourbon you've owned over your lifetime.`,
		},
		{
			icon: HiOutlineClipboard,
			title: 'Build the ulitmate sharable wishlist',
			content: `There is always another bourbon you want to own. Create an account
			and start building your ultimate bourbon wishlist. You can even
			share your carefully crafted wishlist with friends and family via a
			custom link.`,
		},
	];
	return (
		<>
			<div className={styles.landing_wrapper}>
				<h1>
					<ImQuotesLeft /> You Love Bourbon. We Love Bourbon. Data.{' '}
					<ImQuotesRight />
				</h1>
				<p>
					We've created a singular experience around a custom Bourbon API. Our
					techno-wizard dorks have spent countless hours in the bourbon matrix
					just to deliver the best possible bourbon data for you to slowly
					savor. If you love bourbon, then it's time to get your bourb(ON).
				</p>
			</div>
			<div className={styles.grid_intro}>
				<h2>Our Offerings</h2>
			</div>
			<div className={styles.landing_grid}>
				{featureArray.map((feature, index) => (
					<FeatureCard key={index} feature={feature} borders={true} />
				))}
			</div>
			<div className={styles.btn_group}>
				<button onClick={(e) => navigate('/login')}>Get Started!</button>
			</div>
		</>
	);
};

export default LandingText;
