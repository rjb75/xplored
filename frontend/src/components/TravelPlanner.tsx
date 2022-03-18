import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import leftArrow from "../assets/plannerPageLeftArrow.svg";
import rightArrow from "../assets/plannerPageRightArrow.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import "../styles/TravelPlanner.scss";

export const TravelPlanner = () => (
  <DndProvider backend={HTML5Backend}>
    <div className="travelPlannerWrapper">
      <div className="planenrNavbar">
        <div className="plannerNavbarDate">
          <img src={calendarIcon} alt="" />
          <h1>Mar 20 - Mar 26 2022</h1>
        </div>
        <div style={{display:`flex`}}>
          <img src={leftArrow} alt="" />
          <img src={rightArrow} alt="" />
        </div>
      </div>
    </div>
  </DndProvider>
);

export default TravelPlanner;
