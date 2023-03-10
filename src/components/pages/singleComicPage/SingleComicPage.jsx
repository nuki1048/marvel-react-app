import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useMarvelService from "../../../services/MarverService";

import "./SingleComicPage.scss";
const SingleComicPage = () => {
	const { comicId } = useParams();
	const [comic, setComic] = useState([]);
	const { getComics, loading, error, clearError } = useMarvelService();

	useEffect(() => {
		updateComic();
	}, [comicId]);

	const updateComic = () => {
		clearError();
		getComics(comicId).then(comicItemLoaded);
	};
	const comicItemLoaded = (newComic) => {
		setComic(newComic);
	};

	const item = !(loading || error || !comic) ? <View comic={comic} /> : null;
	const LoadingSpinner = loading ? <Spinner /> : null;
	const ErrorM = error ? <ErrorMessage /> : null;

	return (
		<>
			{item}
			{LoadingSpinner}
			{ErrorM}
		</>
	);
};
const View = ({ comic }) => {
	const { title, price, thumnail, pageCount, description, language } = comic;
	return (
		<div className="single-comic">
			<img src={thumnail} alt="x-men" className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}$</div>
			</div>
			<Link to="../comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleComicPage;
