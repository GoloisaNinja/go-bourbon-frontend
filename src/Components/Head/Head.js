import { Helmet } from 'react-helmet';

const Head = ({ meta }) => {
	return (
		<Helmet>
			<meta charSet='utf-8' />
			<title>{meta.title}</title>
			<meta name='description' content={meta.description} />
			<meta property='og:locale' content='en_US' />
			<meta property='og:type' content='website' />
			<meta property='og:title' content={meta.title} />
			<meta property='og:description' content={meta.description} />
			<meta
				property='og:image'
				content={meta.image ? meta.image : `https://i.imgur.com/ML4uI3A.png`}
			/>
			<meta property='og:url' content={`https://hellobourbon.us`} />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:site' content='@goloisaninja' />
			<meta name='twitter:creator' content='@goloisaninja' />
		</Helmet>
	);
};
export default Head;
