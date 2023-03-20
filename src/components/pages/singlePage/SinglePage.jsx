import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useMarvelService from "../../../services/MarverService";

import AnimatedComponent from "../../animatedComponent/AnimatedComponent";
import AppBanner from "../../appBaner/AppBanner";
const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [comic, setComic] = useState([]);
  const { getComics, loading, error, clearError, getCharacter } =
    useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateData = () => {
    clearError();
    // eslint-disable-next-line default-case
    switch (dataType) {
      case "comic":
        getComics(id).then(comicItemLoaded);

        break;
      case "character":
        getCharacter(id).then(comicItemLoaded);
        break;
    }
  };
  const comicItemLoaded = (newComic) => {
    setComic(newComic);
  };

  const item = !(loading || error || !comic) ? (
    <Component data={comic} />
  ) : null;
  const LoadingSpinner = loading ? <Spinner /> : null;
  const ErrorM = error ? <ErrorMessage /> : null;

  return (
    <AnimatedComponent>
      <AppBanner />
      {item}
      {LoadingSpinner}
      {ErrorM}
    </AnimatedComponent>
  );
};

export default SinglePage;
