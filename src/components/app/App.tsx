import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AppHeader } from "components/appHeader";
import { Spinner } from "components/spinner";

const Page404 = lazy(() => import("components/pages/404"));
const MainPage = lazy(() => import("components/pages/MainPage"));
const ComicsPage = lazy(() => import("components/pages/ComicsPage"));
const SingleComicPage = lazy(() => import("components/pages/SingleComicPage"));

const App = () => {
	return (
		<Router>
			<div className='app'>
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path='/comics' element={<ComicsPage />} />
							<Route path='/comics/:comicId' element={<SingleComicPage />} />
							<Route path='*' element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export { App };
