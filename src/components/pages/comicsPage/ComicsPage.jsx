import React from "react";
import { Helmet } from "react-helmet";

import AppBanner from "../../appBaner/AppBanner";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import ComicsList from "../../comicsList/ComicsList";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />

        <title>Page with list of our comics</title>
      </Helmet>
      <AnimatedComponent>
        <AppBanner />
        <ErrorBoundary>
          <ComicsList />
        </ErrorBoundary>
      </AnimatedComponent>
    </>
  );
};

export default ComicsPage;
