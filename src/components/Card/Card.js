import React, { useState } from "react";
import "./Card.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimateSharedLayout>
      {expanded ? <ExpandedCard param={props} setExpanded={() => setExpanded(false)} /> : <CompactCard param={props} setExpanded={() => setExpanded(true)} />}
    </AnimateSharedLayout>
  );
};

const ExpandedCard = ({ param, setExpanded }) => {
    const data = {
        options: {
          chart: {
            type: "area",
            height: "auto",
          },
    
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.35,
          },
    
          fill: {
            colors: ["#fff"],
            type: "gradient",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            colors: ["white"],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: true,
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z",
            ],
          },
        },
      };
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
    <div 
    style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}
    >
      <UilTimes onClick={setExpanded}
      />
    </div>
    <span>
      {param.title}
    </span>
    <div className="chartContainer">
        <Chart series={param.series} type='area' options={data.options} />
    </div>
    <span>Last 24 hours</span>
      
    
    </motion.div>

  )
};

//Compact Card
const CompactCard = ({ param,setExpanded }) => {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
          /*styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,
          
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'rounded',
          
              // Text size
              textSize: '16px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 1.0,
          
              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',
          
              // Colors
              pathColor: `rgb(62, 152, 199)`,
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}*/
        />

        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
};

export default Card;
