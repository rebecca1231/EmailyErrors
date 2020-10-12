import React from 'react'

 const renderData = (survey) => {
    const total = survey.yes + survey.no + survey.maybe;
    const yesWidth = Math.round((survey.yes / total) * 98);
    const noWidth = Math.round((survey.no / total) * 98);
    const maybeWidth = Math.round((survey.maybe / total) * 98);
    return (
      <>
        <div
          style={{
            backgroundColor: "#2185d0",
            padding: "5px",
            width: `${yesWidth}%`,
            display: "inline-block",
            color: "#f1f3f8",
          }}
        >
          Yes: <br />
          {survey.yes}
        </div>
        <div
          style={{
            backgroundColor: "#00b5ad",
            padding: "5px",
            width: `${maybeWidth}%`,
            display: "inline-block",
            color: "#f1f3f8",
          }}
        >
          Maybe: <br />
          {survey.maybe}
        </div>
        <div
          style={{
            backgroundColor: "#a2d5f2",
            padding: "5px",
            width: `${noWidth}%`,
            display: "inline-block",
            color: "#0f3460",
          }}
        >
          No: <br />
          {survey.no}
        </div>
      </>
    );
  }
  export default renderData