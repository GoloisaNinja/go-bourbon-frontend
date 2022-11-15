import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alert from '../Components/Alert/Alert';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import BourbonsPage from '../Pages/BourbonsPage/BourbonsPage';
import BourbonPage from '../Pages/BourbonPage/BourbonPage';
import DashboardPage from '../Pages/DashboardPage/DashboardPage';
import ReviewsPage from '../Pages/ReviewsPage/ReviewsPage';
import CollectionsPage from '../Pages/CollectionsPage/CollectionsPage';
import CollectionPage from '../Pages/CollectionPage/CollectionPage';
import WishlistsPage from '../Pages/WishlistsPage/WishlistsPage';
import WishlistPage from '../Pages/WishlistPage/WishlistPage';
import NotFound from '../Pages/NotFound/NotFound';
import PrivateRoute from '../Components/Routing/PrivateRoute';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';

import { Provider } from 'react-redux';
import store from '../store';

const AppRouter = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Alert />
				<ScrollToTop />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegistrationPage />} />
					<Route path='/bourbons' element={<BourbonsPage />} />
					<Route path='/bourbons/:bourbonId' element={<BourbonPage />} />
					<Route path='/dashboard' element={<PrivateRoute />}>
						<Route path='/dashboard' element={<DashboardPage />} />
					</Route>
					<Route path='/reviews' element={<PrivateRoute />}>
						<Route path='/reviews' element={<ReviewsPage />} />
					</Route>
					<Route path='/collections' element={<PrivateRoute />}>
						<Route path='/collections' element={<CollectionsPage />} />
					</Route>
					<Route path='/collections/:collectionId' element={<PrivateRoute />}>
						<Route
							path='/collections/:collectionId'
							element={<CollectionPage />}
						/>
					</Route>
					<Route path='/wishlists' element={<PrivateRoute />}>
						<Route path='/wishlists' element={<WishlistsPage />} />
					</Route>
					<Route path='/wishlists/:wishlistId' element={<PrivateRoute />}>
						<Route path='/wishlists/:wishlistId' element={<WishlistPage />} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</Router>
		</Provider>
	);
};
export default AppRouter;
