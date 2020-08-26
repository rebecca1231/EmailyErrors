import React from "react";

const Landing = () => {
  return (
    <div>
      <div className="ui huge header center aligned ">Opine!</div>
      <div className="ui large header center aligned ">
        Want to know what people think?
        <br />
        It's easy!
      </div>
      <div className="ui list">
        <ul>
          <li>Login!</li>
          <li>Add credits</li>
          <li>Create a survey</li>
          <li>Send it to everyone you know!</li>
          ...Wait...
          <li>Check your dashboard to see all your surveys and replies!</li>
        </ul>
      </div>
    </div>
  );
};

export default Landing;
