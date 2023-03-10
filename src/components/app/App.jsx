import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages/Index";

const App = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<AppHeader />
				<main>
					<Routes>
						<Route element={<MainPage />} path="/" />
						<Route element={<ComicsPage />} path="/comics" />
						<Route element={<SingleComicPage />} path="/comics/:comicId" />
						<Route element={<Page404 />} path="*" />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default App;
