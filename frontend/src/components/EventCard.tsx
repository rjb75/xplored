import React from "react";
import "../styles/EventCard.scss";
import foodIcon from "../assets/lunchIcon.svg";

export enum eventTypes {
  FOOD = "food",
  CAR = "car",
  FLIGHT = "flight",
  ACCOMODATION = "accomodation",
  POI = "poi",
}

type AppProps = {
  color: string;
  time: string;
  title: string;
  duration: string;
  type: eventTypes;
};

export const EventCard = ({ color, type, time, title, duration }: AppProps) => {
  function getIcon(eventType: eventTypes) {
    switch (eventType) {
      case "food":
        return <img src={foodIcon} alt="" />;

      default:
        break;
    }
  }

  return (
    <div className="eventCard" style={{ backgroundColor: color }}>
      <div className="leftSide">
        {getIcon(type)}
        <div className="headerContainers">
          <h1>{time}</h1>
          <h2>{title}</h2>
        </div>
      </div>
      <p>{duration}</p>
    </div>
  );
};

export default EventCard;
