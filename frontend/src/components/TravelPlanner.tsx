import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { days, timeRows } from "../utils/PlannerConstants";

import leftArrow from "../assets/plannerPageLeftArrow.svg";
import rightArrow from "../assets/plannerPageRightArrow.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import "../styles/TravelPlanner.scss";

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
            {timeRows.map((row) => {
              return (
                <div className="cellContainer">
                  <div className="cell"></div>
                  <div className="cell"></div>
                  <div className="cell"></div>
                  <div className="cell"></div>
                  <div className="cell"></div>
                  <div className="cell"></div>
                  <div className="cell"></div>
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
