import React from "react";
import "../styles/EventCard.scss";
import foodIcon from "../assets/lunchIcon.svg";
import { useDrag } from "react-dnd";

export enum eventTypes {
  FOOD = "food",
  CAR = "car",
  FLIGHT = "flight",
  ACCOMODATION = "accomodation",
  POI = "poi",
}

const Events = {
  EVENT: 'event',
}

type AppProps = {
  time: string;
  title: string;
  duration: string;
  type: eventTypes;
};

export const EventCard = ({ type, time, title, duration }: AppProps) => {
  function getIcon(eventType: eventTypes) {
    switch (eventType) {
      case "food":
        return <img src={foodIcon} alt="" />;

      default:
        break;
    }
  }

  /*
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Events.EVENT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  */

  return (
    <div className={"eventCard " + type}>
      {/*<div className="leftSide"></div>*/}
      <div className="middle">
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