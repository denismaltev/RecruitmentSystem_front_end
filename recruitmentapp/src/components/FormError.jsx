import React from "react";

export default function FormErrors(props) {
  if (
    props.formerrors &&
    (props.formerrors.blankfield || props.formerrors.matchedpassword 
    || props.formerrors.invalidEmail)
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
          {!props.formerrors.blankfield && props.formerrors.invalidEmail ? "Invalid Email" : " "}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
