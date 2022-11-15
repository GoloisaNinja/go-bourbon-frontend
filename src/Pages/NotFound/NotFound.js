import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import styles from './NotFound.module.scss';

const NotFound = () => {
	const textLower = <h1>Not Found...</h1>;
	const ridiculousQuotes = [
		"Home is not a place. It's a Bourbon in your hand.",
		'If you are lost, you can always find home by following the Bourbon Star.',
		'Statistically, you are more likely to be hit by bus than to hate Bourbon.',
		'You are never truly lost so long as you keep Bourbon in your heart.',
		`And lo the exaulted one said "Let there be Bourbon" and it was good.`,
		`Lost? Just whisper Bourbon while clicking your heels three times.`,
	];
	return (
		<div className={styles.container}>
			<HeroSplash type={'home'} textUpper={'404'} textLower={textLower} />
			<div>
				<h1>
					<ImQuotesLeft />
					{
						ridiculousQuotes[
							Math.floor(Math.random() * ridiculousQuotes.length)
						]
					}{' '}
					<ImQuotesRight />
				</h1>
				<p>
					Looks like you've opted for the road less travelled. Normally I'd
					applaud that kind of thing. But I didn't build this application just
					so you could skulk around in all the weird and dusty corners. I
					literally spent days building this. So go and build a collection or
					something. You don't have to go home, but you can't stay here...
				</p>
			</div>
		</div>
	);
};
export default NotFound;
