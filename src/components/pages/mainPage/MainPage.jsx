import { useState } from "react";
import { Helmet } from "react-helmet";

import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";
import CharForm from "../../charForm/CharForm";
const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />

        <title>Marvel information portal</title>
      </Helmet>
      <AnimatedComponent>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <div>
            <ErrorBoundary>
              <CharInfo charId={selectedChar} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharForm />
            </ErrorBoundary>
          </div>
        </div>
      </AnimatedComponent>
    </>
  );
};

export default MainPage;
