import React, { Component } from "react";

import MarvelService from "../../services/MarverService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./CharList.scss";
class CharList extends Component {
	marvelService = new MarvelService();

	state = {
		posts: [],
		loading: true,
		newItemLoading: false,
		error: false,
		offset: 210,
		charEnded: false,
	};
	getDataCharacters = () => {
		this.onRequest();
	};

	componentDidMount() {
		this.getDataCharacters();
	}

	onError = () => {
		this.setState({ loading: false, error: true });
	};
	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError);
	};

	onCharListLoading = () => {
		this.setState({ newItemLoading: true });
	};

	onCharListLoaded = (newPosts) => {
		let ended = false;
		if (newPosts.length < 9 || this.state.offset === 1562 - 9) {
			ended = true;
		}

		this.setState(({ posts, offset }) => ({
			posts: [...posts, ...newPosts],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended,
		}));
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

export default CharList;
