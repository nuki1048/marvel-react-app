import { Component } from "react";
import React from "react";

import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarverService";

import "./CharInfo.scss";
class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}
	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	updateChar = () => {
		const { charId } = this.props;

		if (!charId) {
			return;
		}

		this.onCharUpdating();
		this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError);
	};

	onError = () => {
		this.setState({ loading: false, error: true });
	};

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	};

	onCharUpdating = () => {
		this.setState({ loading: true });
	};

	render() {
		const { char, loading, error } = this.state;
		const skeleton = char || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? <View char={char} /> : null;
		return (
			<div className="char__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		);
	}
}
const View = ({ char }) => {
	const { name, descr, thumnail, homepage, wiki, comics } = char;
	let imgStyle = { objectFit: "cover" };
	if (thumnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
		imgStyle = { objectFit: "unset" };
	}
	return (
		<>
			<div className="char__basics">
				<img style={imgStyle} src={thumnail} alt="abyss" />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{descr}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length === 0
					? "This character has no comics"
					: comics.map((item, i) => {
							// eslint-disable-next-line array-callback-return
							if (i > 9) return;
							return (
								<li key={i} className="char__comics-item">
									<a className="char__comics-link" href={item.resourceURI}>
										{item.name}
									</a>
								</li>
							);
					  })}
			</ul>
		</>
	);
};

export default CharInfo;
