import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Page404 from "../pages/404";

import ComicsPage from "../pages/ComicsPage";
import MainPage from "../pages/MainPage";

const App = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<AppHeader />
				<main>
					<Routes>
						<Route element={<MainPage />} path="/" />
						<Route element={<ComicsPage />} path="/comics" />
						<Route element={<Page404 />} path="*" />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default App;
