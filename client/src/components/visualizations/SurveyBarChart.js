import React, { useRef, useEffect, useState } from "react";
import { select, scaleBand, scaleLinear, axisBottom, axisRight, max } from "d3";
import ResizeObserver from "resize-observer-polyfill";
import { useSelector } from "react-redux";

import { fetchSurvey } from "../../actions";

//custom hook to handle chart resizing
const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};

const SurveyBarChart = (props) => {
const id = props.id
 
  const sData = useSelector((state) => state.surveys.filter(s => s._id === id))
  let data, title, subject, body;
  if (sData[0]) {
    data = [sData[0].yes, sData[0].maybe, sData[0].no];
    title = sData[0].title;
    subject = sData[0].subject;
    body = sData[0].body;
  } else {
    data = [300, 200, 100];
  }

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchSurvey(id);
      return response;
    }
    fetchData();

    const svg = select(svgRef.current);

    if (!dimensions) return;

    //scales
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.25);

    const yScale = scaleLinear().domain([0, max(data)]).range([dimensions.height, 0]);

    const colorScale = scaleLinear()
      .domain([75, 150, 225])
      .range(["#2185d0", "#00b5ad", "#a2d5f2"])
      .clamp(true);

    const xAxis = axisBottom(xScale).tickFormat("");

    svg
      .select("#x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale).ticks(8);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        const i = data.indexOf(index);
        const msg = i === 0 ? "Yes: " : i === 1 ? "Maybe: " : "No: ";
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(index)))
          .attr("class", "tooltip")
          .text(`${msg}${index}`)
          .attr("x", xScale(i) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("opacity", 1)
          .attr("y", yScale(index) - 10);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [data, dimensions, id]);

  return (
    <div>
      <h3 className="ui header">Title: {title}</h3>
      <div className="ui list">
        <div className="item">Subject: {subject}</div>
        <div className="item">Body: {body}</div>
      </div>
    <div ref={wrapperRef} style={{ marginBottom: "2rem", marginTop: "3rem" }}>
      <svg ref={svgRef} style={{ overflow: "visible" }}>
        <g id="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
    </div>
  );
};
export default SurveyBarChart;
