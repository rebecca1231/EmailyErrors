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
      <ol className="ui huge list" style={{margin:"0 4rem", padding: "1rem"}}>
          <li className="item">
            <div className="">Login!</div>
            </li>
          <li className="item">Add credits.</li>
          <li className="item">Create a survey.</li>
          <li className="item">Send it to everyone you know!</li>
          <li className="item">Check your dashboard to see all your surveys and replies.</li>
      </ol>
    </div>
  );
};

export default Landing;
