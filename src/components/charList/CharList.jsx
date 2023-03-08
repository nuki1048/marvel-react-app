import React, { useState,useEffect,useRef } from "react";

import PropTypes from "prop-types";
import MarvelService from "../../services/MarverService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./CharList.scss";
const CharList = (props) => {
	

	const [posts,setPosts] = useState([]);
	const [loading,setLoading] = useState(true);
	const [newItemLoading,setNewItemLoading] = useState(false);
	const [error,setError] = useState(false);
	const [offset,setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	
	const marvelService = new MarvelService();

	
	const getDataCharacters = () => {
		onRequest();
	};

	useEffect(() => {
		getDataCharacters();
	},[]);

	const onError = () => {
		setLoading(false);
		setError(true);
	};
	const onRequest = (offset) => {
		onCharListLoading();
		marvelService.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
	};

	const onCharListLoading = () => {
		setNewItemLoading(true);
	};

	const onCharListLoaded = (newPosts) => {
		let ended = false;
		if (newPosts.length < 9 || this.state.offset === 1562 - 9) {
			ended = true;
		}

		setPosts(posts => [...posts, ...newPosts]);
		setLoading(false);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(charEnded => ended);
	};

	renderList = (arr) => {
		const items = arr.map((item) => {
			let imgStyle = { objectFit: "cover" };
			if (item.thumnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
				imgStyle = { objectFit: "unset" };
			}
			return (
				<li class="char__item" onClick={() => this.props.onCharSelected(item.id)} key={item.id}>
					<img style={imgStyle} src={item.thumnail} alt={item.name} />
					<div class="char__name">{item.name}</div>
				</li>
			);
		});

		return <ul class="char__grid">{items}</ul>;
	};
	render() {
		const { posts, loading, error, offset, newItemLoading, charEnded } = this.state;
		const items = this.renderList(posts);
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error) ? items : null;
		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button
					onClick={() => this.onRequest(offset)}
					disabled={newItemLoading}
					style={{ display: charEnded ? "none" : "block" }}
					className="button button__main button__long"
				>
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}
CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
