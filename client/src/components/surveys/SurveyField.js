//SurveyField contains logic to render a single label & text imput

import React from "react";
//desctructure input off props object

export default ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  const renderError =
    meta.error && meta.touched ? meta.error : ""
const errorClass = meta.error && meta.touched ? "ui negative tiny message" : ""

  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} />
      <div className={errorClass}>
        <div className="header">{renderError} </div>
      </div>
    </div>
  );
};
