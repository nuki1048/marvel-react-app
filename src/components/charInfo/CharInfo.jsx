import { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarverService";

import "./CharInfo.scss";

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.charId]);

	const updateChar = () => {
		if (!props.charId) {
			return;
		}
		clearError();
		getCharacter(props.charId).then(onCharLoaded);
	};

	const onCharLoaded = (char) => {
		setChar(char);
	};

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
};

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
CharInfo.propTypes = {
	charId: PropTypes.number,
};
export default CharInfo;
