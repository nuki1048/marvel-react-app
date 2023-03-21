import React from "react";
import { Helmet } from "react-helmet";

import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";
const Page404 = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="404 ERROR" />

        <title>404 ERROR</title>
      </Helmet>
      <AnimatedComponent>
        <ErrorMessage />
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            marginTop: "30px",
          }}
        >
          Page does'nt exist
        </p>
        <Link
          style={{
            display: "block",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            marginTop: "30px",
            textDecoration: "underline",
          }}
          to="/"
        >
          Back to main page
        </Link>
      </AnimatedComponent>
    </>
  );
};

export default Page404;
