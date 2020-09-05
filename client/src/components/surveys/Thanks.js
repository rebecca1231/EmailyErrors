import React from "react";

const Answer = () => {
  return (
    <div style={{ backgroundColor: "blue" }}>
      <div
        style={{
          backgroundColor: "#eeeeee",
          padding: "3rem",
          textAlign: "center",
          fontFamily: "'Lobster Two', Arial, sans-serif",
          color: "#24a19c",
        }}
      >
        <div
          style={{
            borderRadius: "25px",
            textAlign: "center",
            lineHeight: 1.5,
            backgroundColor: "white",
            fontFamily: "‘Roboto’, Arial, sans-serif",
            color: "black",
            padding: "2rem",
          }}
        >
          <h2> Thank you! </h2>
          <p> Your opinion has been sent! </p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
