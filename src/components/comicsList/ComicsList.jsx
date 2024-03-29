/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { m, LazyMotion, domAnimation } from "framer-motion";

import useMarvelService from "../../services/MarverService";
import "./ComicsList.scss";
import Spinner from "../spinner/Spinner";
const ComicsList = () => {
	const [offset, setOffset] = useState(210);
	const [comics, setComics] = useState([]);
	const [charEnded, setCharEnded] = useState(false);
	const [newComicsLoading, setNewComicsLoading] = useState(false);

	const listVariants = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	};

	const itemVariants = {
		visible: { opacity: 1, y: 0 },
		hidden: { opacity: 0, y: 100 },
	};
	const { getAllComics, error, loading } = useMarvelService();
	const onRequest = (offset, initial) => {
		initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

		getAllComics(offset).then(onComicsListLoaded);
	};

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onComicsListLoaded = (newComics) => {
		let ended = false;
		if (newComics.length < 8) {
			ended = true;
		}
		setComics((comics) => [...comics, ...newComics]);
		setOffset((offset) => offset + 8);
		setNewComicsLoading((newItemLoading) => false);
		setCharEnded((charEnded) => ended);
	};
	const renderComics = (arr) => {
		const comics = arr.map((item, i) => {
			const { thumnail, id, title, price } = item;
			const priceCheck = price > 0 ? `${price}$` : "NOT AVAILABLE";
			return (
				<LazyMotion features={domAnimation}>
					<m.li variants={itemVariants} key={i} className="comics__item">
						<Link to={`/comics/${id}`}>
							<img src={thumnail} alt="ultimate war" className="comics__item-img" />
							<div className="comics__item-name">{title}</div>
							<div className="comics__item-price">{priceCheck}</div>
						</Link>
					</m.li>
				</LazyMotion>
			);
		});
		return (
			<LazyMotion features={domAnimation}>
				<m.ul initial="hidden" animate="visible" variants={listVariants} className="comics__grid">
					{comics}
				</m.ul>
			</LazyMotion>
		);
	};
	const items = renderComics(comics);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newComicsLoading ? <Spinner /> : null;
	return (
		<div className="comics__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				onClick={() => onRequest(offset)}
				disabled={newComicsLoading}
				style={{ display: charEnded ? "none" : "block" }}
				className="button button__main button__long"
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
