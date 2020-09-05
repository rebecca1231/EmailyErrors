import React from "react";
import myVideo from "../myVideo.mov";

const Landing = () => {
  return (
    <div >
      <div  className="ui container">
      <div
        style={{ color: "#24a19c", fontFamily: "Lobster Two", fontSize: "5em" }}
        className="ui huge header center aligned "
      >
        Opine!       <p style={{fontSize:"1.25rem", color: "#24a19c", fontFamily: "Lobster Two"}} >...to state one's opinion</p>

      </div>
      <div className="ui huge header center aligned">Have a question?</div>
      <div className="ui large header center aligned">
        Need some opinions on the matter?
      </div>
      <div className="ui large header center aligned">It's easy!</div>
      <ol className="ui huge list">
        <li className="item">Login with Google account.</li>
        <li className="item">Compose a question.</li>
        <li className="item">Send it to everyone you know!</li>
        <li className="item">
          Check your dashboard to see all your questions and answers.
        </li>
      </ol>
      </div>
      <video
        src={myVideo}
        autoPlay="true"
        style={{ display: "block", margin: "1rem auto 10rem auto", width: "80vw", maxWidth:"500px" }}
        controls="controls"
        autoplay="true"
      />
    </div>
  );
};

export default Landing;
