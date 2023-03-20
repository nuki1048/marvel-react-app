import React, { useState } from "react";
import useMarvelService from "../../services/MarverService";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./CharForm.scss";

const CharForm = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacterByName, loading, error, clearError } = useMarvelService();

  const validationSchema = Yup.object({
    charName: Yup.string("Only a string").required("This field is required"),
  });
  const getDataCharacter = (character) => {
    clearError();
    getCharacterByName(character).then(onCharLoaded);
  };

  const onCharLoaded = (characterData) => {
    setChar(characterData);
  };

  const ShowLink = !char ? null : char.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/character/${char[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-critical-error">
      The character was not found. Check the name and try again
    </div>
  );
  const Error = error ? (
    <div>
      <ErrorMessage />
    </div>
  ) : null;

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{ charName: "" }}
        validationSchema={validationSchema}
        onSubmit={({ charName }) => {
          getDataCharacter(charName);
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              type="submit"
              disabled={loading}
              className="button button__main"
            >
              <div className="inner">find</div>
            </button>
          </div>
          <ErrorMessage
            className="char__search-error"
            component="div"
            name="charName"
          />
        </Form>
      </Formik>
      {ShowLink}
      {Error}
    </div>
  );
};
// const View = ({ data }) => {};

export default CharForm;
