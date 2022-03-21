import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { days, timeRows } from "../utils/PlannerConstants";
//@ts-ignore
import leftArrow from "../assets/plannerPageLeftArrow.svg";
//@ts-ignore
import rightArrow from "../assets/plannerPageRightArrow.svg";
//@ts-ignore
import calendarIcon from "../assets/calendarIcon.svg";
import "../styles/TravelPlanner.scss";
import EventCard from "./EventCard";
import { eventTypes } from "./EventCard";
import PlannerCell from "./PlannerCell";

export const TravelPlanner = () => (
  <DndProvider backend={HTML5Backend}>
    <div className="travelPlannerWrapper">
      <div className="plannerNavbar">
        <div style={{ width: `33.3%` }}></div>
        <div className="plannerNavbarDate">
          <div className="dateWrapper">
            <img src={calendarIcon} alt="" />
            <h1>Mar 20 - Mar 26 2022</h1>
          </div>
        </div>
        <div className="arrowWrapper">
          <img src={leftArrow} alt="" />
          <img src={rightArrow} alt="" />
        </div>
      </div>

      <div className="planner">
        <div className="timeWrapper">
          {timeRows.map((row) => {
            return <div className="time">{row.time}</div>;
          })}
        </div>
        <div className="table">
          <div className="daysWrapper">
            {days.map((day) => {
              return <h1>{day.name}</h1>;
            })}
          </div>
          <div className="cellWrapper">
            {timeRows.map((row, index) => {
              return (
                <div className="cellContainer">
                  <PlannerCell test day="1" time={index} ></PlannerCell>
                  <PlannerCell day="2" time={index} ></PlannerCell>
                  <PlannerCell day="3" time={index} ></PlannerCell>
                  <PlannerCell day="4" time={index} ></PlannerCell>
                  <PlannerCell day="5" time={index} ></PlannerCell>
                  <PlannerCell day="6" time={index} ></PlannerCell>
                  <PlannerCell day="7" time={index} ></PlannerCell>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </DndProvider>
);

export default TravelPlanner;
