import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./services/MarverService";

import "./styles/Style.scss";

const marvelService = new MarvelService();
marvelService.getAllCharacters().then((res) => res.data.results.forEach((element) => console.log(element.name)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
