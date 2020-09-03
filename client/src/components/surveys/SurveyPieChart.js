import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { select, arc, pie, scaleOrdinal, schemeBlues, interpolate } from "d3";
import useResizeObserver from "../../utils/useResizeObserver";
import { fetchSurvey } from "../../actions";

const PieChart = (props) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const id = props.id;
  const survey = useSelector((state) => state.surveys[0]);
  let data, title, subject, body;
  if (survey) {
    data = [survey.yes, survey.maybe, survey.no];
    title = survey.title;
    subject = survey.subject;
    body = survey.body;
  } else {
    data = [300, 200, 100];
  }

  useEffect(() => {
    async function fetchData() {
      const response = fetchSurvey(id);
      return response;
    }
    fetchData();

    const colorScale = scaleOrdinal(schemeBlues[3]);
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const arcGenerator = arc().innerRadius(75).outerRadius(150);
    const pieGenerator = pie().sort(null);
    const instructions = pieGenerator(data);

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("stroke", "black")
      .attr("fill", (d, i) => colorScale(i))
      .style(
        "transform",
        `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
      )
      .attr("d", (instruction) => arcGenerator(instruction))
      .on("mouseenter", (d, i) => {
        svg
          .selectAll(".tooltip")
          .data(instructions)
          .join((enter) => enter.append("text"))
          .attr("class", "tooltip")
          .text(
            i.index === 0
              ? "Yes: " + i.value
              : i.index === 1
              ? "Maybe: " + i.value
              : "No: " + i.value
          )
          .attr("x", dimensions.width / 2)
          .attr("y", dimensions.height)
          .attr("text-anchor", "middle")
          .transition()
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.selectAll(".tooltip").remove())
      .transition()
      .attrTween("d", function (nextInstruction, index) {
        // animation when changing data
        const interpolator = interpolate(this.lastInstruction, nextInstruction);
        this.lastInstruction = interpolator(1);
        return function (t) {
          return arcGenerator(interpolator(t));
        };
      });
  }, [data, dimensions]);

  return (
    <div>
      <h3 className="ui header">Title: {title}</h3>
      <div className="ui list">
        <div className="item">Subject: {subject}</div>
        <div className="item">Body: {body}</div>
      </div>
      <div
        ref={wrapperRef}
        style={{ marginTop: "3rem", marginBottom: "15rem" }}
      >
        <svg ref={svgRef} style={{ overflow: "visible" }}></svg>
      </div>
    </div>
  );
};
export default PieChart;
