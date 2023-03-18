import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { m, LazyMotion, domAnimation } from "framer-motion";
import useMarvelService from "../../services/MarverService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./CharList.scss";

const CharList = (props) => {
	const [posts, setPosts] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);

		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (newPosts) => {
		let ended = false;
		if (newPosts.length < 9 || offset === 1562 - 9) {
			ended = true;
		}

		setPosts((posts) => [...posts, ...newPosts]);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 9);
		setCharEnded((charEnded) => ended);
	};

	const itemRefs = useRef([]);

	const onFocusItem = (id) => {
		itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
		itemRefs.current[id].classList.add("char__item_selected");
		itemRefs.current[id].focus();
	};
	function renderList(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = { objectFit: "cover" };
			if (item.thumnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
				imgStyle = { objectFit: "unset" };
			}
			return (
				<LazyMotion features={domAnimation}>
					<m.li
						ref={(el) => (itemRefs.current[i] = el)}
						class="char__item"
						key={item.id}
						onClick={() => {
							props.onCharSelected(item.id);
							onFocusItem(i);
						}}
						onKeyPress={(e) => {
							if (e.key === " " || e.key === "Enter") {
								props.onCharSelected(item.id);
								onFocusItem(i);
							}
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<img style={imgStyle} src={item.thumnail} alt={item.name} />
						<div class="char__name">{item.name}</div>
					</m.li>
				</LazyMotion>
			);
		});

		return <ul class="char__grid">{items}</ul>;
	}

	const items = renderList(posts);

	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				onClick={() => onRequest(offset)}
				disabled={newItemLoading}
				style={{ display: charEnded ? "none" : "block" }}
				className="button button__main button__long"
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};
CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
