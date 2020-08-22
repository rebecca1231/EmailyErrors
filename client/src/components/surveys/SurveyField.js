//SurveyField contains logic to render a single label & text imput

import React from "react";
//desctructure input off props object
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom: '5px'}} />
      <div className="red-text" style={{marginBottom: '20px'}} >
      {touched && error}
    </div>
    </div>
  );
};
