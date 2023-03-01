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
		error: false,
	};
	getDataCharacters = () => {
		this.marvelService
			.getAllCharacters()
			.then((res) => this.setState({ posts: res, loading: false }))
			.catch(this.onError);
	};

	componentDidMount() {
		this.getDataCharacters();
	}

	onError = () => {
		this.setState({ loading: false, error: true });
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
		const { posts, loading, error } = this.state;
		const items = this.renderList(posts);
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error) ? items : null;
		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;
