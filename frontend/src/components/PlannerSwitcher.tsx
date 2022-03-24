import React, { useState } from "react";
import Draggable from "react-draggable";
import "../styles/PlannerSwitcher.scss";
//@ts-ignore
import calendar from "../assets/calendarIcon.svg";
//@ts-ignore
import mapIcon from "../assets/mapIcon.svg";

interface view {
  view: String;
}

interface PlannerSwitcherProps{
  switchFunction: Function,
}

export const PlannerSwitcher = ({switchFunction}: PlannerSwitcherProps) => {
  const [plannerOrMap, setPlannerOrMap] = useState<view>({ view: "planner" }); // True for planner

  function switchView(view: String) {
    setPlannerOrMap({ view: view });
    switchFunction(view);
  }

  return (
    <Draggable bounds="parent">
      <div className="PlannerSwitcherWrapper">
        <div
          className={
            "top " + (plannerOrMap.view === "planner" ? "active" : "deactive")
          }
          onClick={() => switchView("planner")}
        >
          <svg
            className="icon"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 16.4385C0 17.4334 0.806551 18.24 1.80148 18.24H17.1985C18.1935 18.24 19 17.4334 19 16.4385V8.265H0V16.4385ZM18.24 1.71H14.25V0.19C14.25 0.0855 14.1645 0 14.06 0H12.73C12.6255 0 12.54 0.0855 12.54 0.19V1.71H6.46V0.19C6.46 0.0855 6.3745 0 6.27 0H4.94C4.8355 0 4.75 0.0855 4.75 0.19V1.71H0.76C0.339625 1.71 0 2.04962 0 2.47V6.65H19V2.47C19 2.04962 18.6604 1.71 18.24 1.71Z"
              fill={plannerOrMap.view === "planner" ? "white" : "#453F3F"}
            />
          </svg>
        </div>
        <div
          className={
            "bottom " + (plannerOrMap.view === "map" ? "active" : "deactive")
          }
          onClick={() => switchView("map")}
        >
          <svg
            className="icon"
            width="25"
            height="23"
            viewBox="0 0 25 23"
            fill=""
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.2028 4.45479L16.8072 0.757014C16.636 0.671323 16.4471 0.626709 16.2556 0.626709C16.0641 0.626709 15.8753 0.671323 15.704 0.757014L8.86069 4.17992L2.01611 0.757014C1.82814 0.663087 1.61928 0.618772 1.40937 0.628279C1.19946 0.637786 0.995461 0.700799 0.816755 0.811332C0.638049 0.921865 0.490567 1.07625 0.388318 1.25982C0.286068 1.44339 0.232446 1.65006 0.232544 1.86018V17.8839C0.232544 18.351 0.496319 18.7775 0.914168 18.9871L8.30972 22.6848C8.48097 22.7705 8.66982 22.8151 8.86131 22.8151C9.05279 22.8151 9.24165 22.7705 9.41289 22.6848L16.2562 19.2619L23.1008 22.6836C23.2883 22.7784 23.497 22.8234 23.7068 22.8141C23.9167 22.8048 24.1206 22.7416 24.2989 22.6306C24.6625 22.405 24.8844 22.0094 24.8844 21.5817V5.55796C24.8844 5.09081 24.6206 4.66433 24.2028 4.45479ZM10.0933 6.3197L15.0237 3.85452V17.1221L10.0933 19.5873V6.3197ZM2.69773 3.85452L7.6281 6.3197V19.5873L2.69773 17.1221V3.85452ZM22.4192 19.5873L17.4888 17.1221V3.85452L22.4192 6.3197V19.5873Z"
              fill={plannerOrMap.view === "map" ? "white" : "#453F3F"}
            />
          </svg>{" "}
        </div>
      </div>
    </Draggable>
  );
};

export default PlannerSwitcher;
