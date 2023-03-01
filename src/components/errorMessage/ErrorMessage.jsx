import React from "react";
import error from "./error.png";
const ErrorMessage = () => {
	return (
		<img
			style={{ display: "block", width: "150px", height: "150px", objectFit: "contain", margin: "auto" }}
			src={error}
			alt="error"
		/>
	);
};

export default ErrorMessage;
