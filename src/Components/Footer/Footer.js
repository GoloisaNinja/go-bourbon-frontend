import { Link } from 'react-router-dom';
import { SiMastodon } from 'react-icons/si';
import styles from './Footer.module.scss';

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className={styles.footer_container}>
			<div>
				<h3>
					hello bourb<span className={styles.pink_span}>(on)</span>
				</h3>
				<Link to='/'>Home</Link>
				<a
					href='https://github.com/goloisaninja'
					rel='noreferrer'
					target='_blank'>
					Github
				</a>
				<a href='https://whiskeyraiders.com' rel='noreferrer' target='_blank'>
					Whiskey Raiders
				</a>
				<a href='https://caskers.com' rel='noreferrer' target='_blank'>
					Caskers
				</a>
				<p>
					Copyright <span className={styles.pink_span}>{year}</span>
				</p>
			</div>
			<div>
				<h3>
					<SiMastodon />{' '}
					<a
						href='https://hachyderm.io/@joncollinsdev'
						rel='noreferrer'
						target='_blank'>
						joncollins<span className={styles.pink_span}>dev</span>
					</a>
				</h3>
				<a href='https://joncollins.dev' rel='noreferrer' target='_blank'>
					My Portfolio
				</a>
				<a href='https://jcodes.blog' rel='noreferrer' target='_blank'>
					My Blog
				</a>
			</div>
		</footer>
	);
};
export default Footer;
