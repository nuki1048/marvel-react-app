import React, { Component } from "react";
import "./CharList.scss";

import MarvelService from "../../services/MarverService";
import CharListWrapper from "../charListWrapper/CharListWrapper";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
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
	renderList = (res) => {};
	componentDidMount() {
		this.getDataCharacters();
	}
	onError = () => {
		this.setState({ loading: false, error: true });
	};
	render() {
		const { loading, error } = this.state;
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error) ? <CharListWrapper data={this.state?.posts} /> : null;
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
