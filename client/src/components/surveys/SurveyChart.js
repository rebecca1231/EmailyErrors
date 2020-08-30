import React, { useState } from "react"
import SurveyBarChart from "./SurveyBarChart"


const SurveyChart = () => {

const [data, setData] = useState([25, 32, 40, 60, 12, 70, 80]);
 return (
<div       className="ui container"
>
<SurveyBarChart data={data} />
      <button
        onClick={() => setData(data.map((d) => d + 5))}
        className="ui primary button"
      >
        Update
      </button>
      <button
        onClick={() => setData(data.filter((d) => d < 35))}
        className="ui teal button"
      >
        Filter
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random()*125)])}
        className="ui green button"
      >
        Add Data
      </button>
</div>
 )


}

export default SurveyChart;