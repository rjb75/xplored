import React from "react";
import "../styles/EventCard.scss";
//@ts-ignore
import foodIcon from "../assets/lunchIcon.svg";
//@ts-ignore
import carIcon from "../assets/carIcon.svg";
//@ts-ignore
import flightIcon from "../assets/flightIcon.svg";
//@ts-ignore
import POIIcon from "../assets/POIIcon.svg";
//@ts-ignore
import accommodationIcon from "../assets/accommodationIcon.svg";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/PlannerConstants";

export enum eventTypes {
  FOOD = "food",
  CAR = "car",
  FLIGHT = "flight",
  ACCOMODATION = "accommodation",
  POI = "poi",
}

export type plannerEvent = {
  time: String;
  date: String;
  title: String;
  duration: String;
  type: eventTypes;
  id: String;
};

export const EventCard = ({
  type,
  time,
  title,
  duration,
  date,
  id,
}: plannerEvent): JSX.Element => {
  function getIcon(eventType: eventTypes) {
    switch (eventType) {
      case "food":
        return <img src={foodIcon} alt="" />;
      case "car":
        return <img src={carIcon} alt="" />;
      case "flight":
        return <img src={flightIcon} alt="" />;
      case "accommodation":
        return <img src={accommodationIcon} alt="" />;
      case "poi":
        return <img src={POIIcon} alt="" />;
      default:
        break;
    }
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: {
      id: id,
      type: type,
      time: time,
      title: title,
      duration: duration,
      date: date,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  }));

  return (
    <div
      className={"eventCard " + type}
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
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
