import React from "react";
import useMarvelService from "../../services/MarverService";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CharForm.scss";

const CharForm = (props) => {
  const { getCharacterByName } = useMarvelService();

  const validationSchema = Yup.object({
    charName: Yup.string("").required("This field is required"),
  });
  return (
    <div className="char__search-form">
      <Formik
        initialValues={{ charName: "" }}
        validationSchema={validationSchema}
        onSubmit={({ charName }) => {
          getCharacterByName(charName).then((res) => console.log(res));
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
            <button type="submit" className="button button__main">
              <div className="inner">find</div>
            </button>
          </div>
          <ErrorMessage
            className="char-error"
            component="div"
            name="charName"
          />
        </Form>
      </Formik>
    </div>
  );
};
const View = ({ data }) => {};

export default CharForm;
