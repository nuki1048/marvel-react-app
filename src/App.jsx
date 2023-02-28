import "./styles/Style.scss";
import AppHeader from "./components/appHeader/AppHeader";
import RandomChar from "./components/randomChar/RandomChar";
import CharList from "./components/charList/CharList";
import CharInfo from "./components/charInfo/CharInfo";

function App() {
	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<CharList />
					<CharInfo />
				</div>
			</main>
		</div>
	);
}

export default App;
