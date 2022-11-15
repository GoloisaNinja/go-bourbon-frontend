import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import LandingText from '../../Components/LandingText/LandingText';
import Head from '../../Components/Head/Head';

const styles = {
	pink_span: {
		color: `#f826ee`,
		textShadow: 'none',
	},
};

const LandingPage = () => {
	const textLower = (
		<h1>
			bourb<span style={styles.pink_span}>(on)</span>
		</h1>
	);
	return (
		<div>
			<Head
				meta={{
					title: `hello bourbon | Home Page`,
					description: `The hello bourbon home page | find your next great bourbon adventure!`,
				}}
			/>
			<HeroSplash type={`home`} textUpper='hello' textLower={textLower} />
			<LandingText />
		</div>
	);
};

export default LandingPage;
