import React from "react";

export default function FormErrors(props) {
  if (
    props.formerrors &&
    (props.formerrors.blankfield ||
      props.formerrors.matchedpassword ||
      props.formerrors.invalidEmail ||
      props.formerrors.invalidNumberOfLabourersNeeded ||
      props.formerrors.invalidDate)
  ) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">
          {props.formerrors.matchedpassword
            ? "Password value does not match confirm password value"
            : ""}
        </div>
        <div className="row justify-content-center help is-danger">
          {props.formerrors.blankfield ? "All fields are Required" : ""}
        </div>

        <div className="row justify-content-center help is-danger">
          {!props.formerrors.blankfield && props.formerrors.invalidEmail
            ? "Invalid Email"
            : " "}
        </div>

        <div className="row justify-content-center help is-danger">
          {!props.formerrors.blankfield &&
          props.formerrors.invalidNumberOfLabourersNeeded
            ? "Please select number of people you needed for each skill"
            : " "}
        </div>

        <div className="row justify-content-center help is-danger">
          {!props.formerrors.blankfield && props.formerrors.invalidDate
            ? "Something wrong with your start or end date."
            : " "}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
