import { useState } from "react";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";
const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null);
	const onCharSelected = (id) => {
		setSelectedChar(id);
	};

	return (
		<AnimatedComponent>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo charId={selectedChar} />
				</ErrorBoundary>
			</div>
		</AnimatedComponent>
	);
};

export default MainPage;
