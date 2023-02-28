/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import UW from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";
import "./ComicsList.scss";
const ComicsList = () => {
	return (
		<div className="comics__list">
			<ul className="comics__grid">
				<li className="comics__item">
					<a href="#">
						<img src={UW} alt="ultimate war" className="comics__item-img" />
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href="#">
						<img src={xMen} alt="x-men" className="comics__item-img" />
						<div className="comics__item-name">X-Men: Days of Future Past</div>
						<div className="comics__item-price">NOT AVAILABLE</div>
					</a>
				</li>
				<li className="comics__item">
					<a href="#">
						<img src={UW} alt="ultimate war" className="comics__item-img" />
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href="#">
						<img src={xMen} alt="x-men" className="comics__item-img" />
						<div className="comics__item-name">X-Men: Days of Future Past</div>
						<div className="comics__item-price">NOT AVAILABLE</div>
					</a>
				</li>
				<li className="comics__item">
					<a href="#">
						<img src={UW} alt="ultimate war" className="comics__item-img" />
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href="#">
						<img src={xMen} alt="x-men" className="comics__item-img" />
						<div className="comics__item-name">X-Men: Days of Future Past</div>
						<div className="comics__item-price">NOT AVAILABLE</div>
					</a>
				</li>
				<li className="comics__item">
					<a href="#">
						<img src={UW} alt="ultimate war" className="comics__item-img" />
						<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
						<div className="comics__item-price">9.99$</div>
					</a>
				</li>
				<li className="comics__item">
					<a href="#">
						<img src={xMen} alt="x-men" className="comics__item-img" />
						<div className="comics__item-name">X-Men: Days of Future Past</div>
						<div className="comics__item-price">NOT AVAILABLE</div>
					</a>
				</li>
			</ul>
			<button className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
