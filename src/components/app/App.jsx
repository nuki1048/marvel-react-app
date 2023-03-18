import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404/404"));
const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const ComicsPage = lazy(() => import("../pages/comicsPage/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/singleComicPage/SingleComicPage"));

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<AppHeader />}>
				<Route index element={<MainPage />} />
				<Route element={<ComicsPage />} path="/comics" />
				<Route element={<SingleComicPage />} path="/comics/:comicId" />
				<Route element={<Page404 />} path="*" />
			</Route>
		)
	);
	return (
		<div className="app">
			<Suspense fallback={<Spinner />}>
				<main>
					<RouterProvider router={router} />
				</main>
			</Suspense>
		</div>
	);
};

export default App;
