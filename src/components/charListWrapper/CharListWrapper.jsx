import React from "react";
import CharListItem from "../charListItem/CharListItem";
import nextId from "react-id-generator";
const CharListWrapper = ({ data }) => {
	console.log(data);
	return (
		<ul class="char__grid">
			{data.map((element) => (
				<CharListItem thumnail={element.thumnail} name={element.name} key={nextId("char-")} />
			))}
		</ul>
	);
};

export default CharListWrapper;
