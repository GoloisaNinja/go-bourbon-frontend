import { useState, useEffect, useCallback } from 'react';
import { getPaginatedBourbons, cleanUpBourbons } from '../../Actions/bourbons';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import Search from '../../Components/Search/Search';
import FilterDetails from '../../Components/Filters/FilterDetails';
import BourbonsPageFilters from '../../Components/Filters/BourbonsPageFilters';
import Loading from '../../Components/Loading/Loading';
//import Head from '../../Components/Head/Head';
import smoothscroll from 'smoothscroll-polyfill';
import BourbonsGrid from '../../Components/BourbonsGrid/BourbonsGrid';
import styles from './BourbonsPage.module.scss';

const BourbonsPage = ({
	bourbons: { loading, bourbons, last_page },
	getPaginatedBourbons,
	cleanUpBourbons,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [paramSearchTerm, setParamSearchTerm] = useState('');
	const [paramSorts, setParamSorts] = useState('');
	//const [meta, setMeta] = useState({});
	const location = useLocation();
	const navigate = useNavigate();
	const returnParams = useCallback(async () => {
		const params = new URLSearchParams(location.search);
		let page = 1;
		if (params.get('page')) {
			page = params.get('page');
		}
		let search = '';
		if (params.get('search')) {
			search = params.get('search');
		}
		let sort = 'title_asc';
		if (params.get('sort')) {
			let sortArr = params.get('sort').split('_');
			if (sortArr[1]) {
				sort = params.get('sort');
			} else {
				sort = `${sortArr[0]}_asc`;
			}
		}
		return { page, search, sort };
	}, [location]);

	const getSearchElementYOffset = () => {
		const searchEl = document.getElementById('search');
		const searchElYOffset =
			searchEl.getBoundingClientRect().top + window.pageYOffset;
		return searchElYOffset;
	};

	const handlePage = async (direction) => {
		smoothscroll.polyfill();
		const pageParams = await returnParams();
		const { search, sort } = pageParams;
		let baseLocation = `/bourbons?`;
		if (search) {
			baseLocation = `/bourbons?search=${search}&`;
		}
		if (direction) {
			setCurrentPage(currentPage + 1);
			navigate(`${baseLocation}sort=${sort}&page=${currentPage + 1}`, {
				state: { pageScrollPos: getSearchElementYOffset() },
			});
		} else {
			setCurrentPage(currentPage - 1);
			navigate(`${baseLocation}sort=${sort}&page=${currentPage - 1}`, {
				state: { pageScrollPos: getSearchElementYOffset() },
			});
		}
	};

	const handleSearch = async (searchTerm) => {
		const pageParams = await returnParams();
		const { sort } = pageParams;
		navigate(`/bourbons?search=${searchTerm}&sort=${sort}`, {
			state: { pageScrollPos: getSearchElementYOffset() },
		});
	};

	const handleSort = async (sortby, sortdirection) => {
		const pageParams = await returnParams();
		const { search } = pageParams;
		let baseLocation = `/bourbons?`;
		if (search) {
			baseLocation = `/bourbons?search=${search}&`;
		}
		navigate(`${baseLocation}sort=${sortby}_${sortdirection}`, {
			state: { pageScrollPos: getSearchElementYOffset() },
		});
	};

	useEffect(() => {
		const fetchBourbons = async () => {
			const pageParams = await returnParams();
			const { page, search, sort } = pageParams;
			try {
				await getPaginatedBourbons(page, search, sort);
				setCurrentPage(parseInt(page));
				setParamSearchTerm(search);
				setParamSorts(sort);
				// setMeta(response);
			} catch (error) {
				console.log(error);
			}
		};
		fetchBourbons();

		return () => cleanUpBourbons();
	}, [location.search, returnParams, getPaginatedBourbons, cleanUpBourbons]);

	const textLower = (
		<h1>
			obsessi<span className={styles.pink_span}>(on)</span>
		</h1>
	);
	return (
		<div>
			{/* <Head meta={meta} /> */}
			<HeroSplash type={'bourbons'} textUpper={'hello'} textLower={textLower} />
			<Search handleSearch={handleSearch} />
			<BourbonsPageFilters handleSort={handleSort} />
			<FilterDetails
				searchTerm={paramSearchTerm}
				sorts={paramSorts}
				page={currentPage}
			/>
			{loading ? (
				<Loading />
			) : (
				<>
					<BourbonsGrid bourbons={bourbons} />
					{bourbons.length > 0 && (
						<>
							<div className={styles.btn_group}>
								<button
									disabled={currentPage <= 1}
									onClick={(e) => handlePage(false)}>
									<BsChevronLeft />
								</button>
								<button
									disabled={currentPage === last_page}
									onClick={(e) => handlePage(true)}>
									<BsChevronRight />
								</button>
							</div>
							<div className={styles.pages}>
								<p>
									Page {currentPage} of {last_page}
								</p>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

BourbonsPage.propTypes = {
	bourbons: PropTypes.object.isRequired,
	getPaginatedBourbons: PropTypes.func.isRequired,
	cleanUpBourbons: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	bourbons: state.bourbons,
});

export default connect(mapStateToProps, {
	getPaginatedBourbons,
	cleanUpBourbons,
})(BourbonsPage);
