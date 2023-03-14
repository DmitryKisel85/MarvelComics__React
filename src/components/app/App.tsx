import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { lazyImport } from "services/lazyImport";

import { AppHeader } from "components/appHeader";
import { Spinner } from "components/spinner";

import s from "./app.module.scss";

const { Page404 } = lazyImport(() => import("components/pages/page404"), "Page404");
const { MainPage } = lazyImport(() => import("components/pages/mainPage"), "MainPage");
const { ComicsPage } = lazyImport(() => import("components/pages/comicsPage"), "ComicsPage");
const { SingleComicPage } = lazyImport(() => import("components/pages/singleComicPage"), "SingleComicPage");

const App = () => {
	return (
		<Router>
			<div className={s.root}>
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
