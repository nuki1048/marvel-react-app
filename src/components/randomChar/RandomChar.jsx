/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarverService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./RandomChar.scss";
const RandomChar = () => {
	const [char, setChar] = useState({});
	const { error, loading, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
	};
	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id).then(onCharLoaded);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? <View char={char} /> : null;

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">Or choose another one</p>
				<button className="button button__main">
					<div onClick={updateChar} className="inner">
						try it
					</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	);
};

const View = ({ char }) => {
	const { name, descr, thumnail, homepage, wiki } = char;
	let classImg = "randomchar__img";
	const imageNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
	if (char.thumnail === imageNotFound) {
		classImg += " unset";
	} else {
		classImg += " cover";
	}
	return (
		<div className="randomchar__block">
			<img src={thumnail} alt="Random character" className={classImg} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{descr?.length > 230 ? `${descr.slice(0, 200)}...` : descr}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} class="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};
export default RandomChar;
