import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import { AnimatePresence } from "framer-motion";

const Page404 = lazy(() => import("../pages/404/404"));
const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const ComicsPage = lazy(() => import("../pages/comicsPage/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/singleComicPage/SingleComicPage"));

const App = () => {
	const location = useLocation();
	return (
		<div className="app">
			<Suspense fallback={<Spinner />}>
				<AppHeader />
				<main>
					<AnimatePresence mode="wait">
						<Routes key={location.pathname} location={location}>
							<Route index element={<MainPage />} />
							<Route element={<ComicsPage />} path="/comics" />
							<Route element={<SingleComicPage />} path="/comics/:comicId" />
							<Route element={<Page404 />} path="*" />
						</Routes>
					</AnimatePresence>
				</main>
			</Suspense>
		</div>
	);
};

export default App;
