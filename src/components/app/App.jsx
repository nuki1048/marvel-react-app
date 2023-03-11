import {
	BrowserRouter,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Routes,
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages/Index";

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
			<main>
				<RouterProvider router={router} />
			</main>
		</div>
	);
};

export default App;
