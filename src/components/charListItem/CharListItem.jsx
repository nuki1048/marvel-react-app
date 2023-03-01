import React from "react";

const CharListItem = (props) => {
	return (
		<li class="char__item">
			<img src={props.thumnail} alt="abyss" />
			<div class="char__name">{props.name}</div>
		</li>
	);
};

export default CharListItem;
