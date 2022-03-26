import React, { useEffect, useState } from "react";
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
import { Resizable, NumberSize } from "re-resizable";

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
  duration: string;
  eventType: eventTypes;
  id: String;
  type: string;
  editCallback?: Function;
};

export const EventCard = ({
  eventType,
  time,
  title,
  duration,
  date,
  id,
  type,
  editCallback,
}: plannerEvent): JSX.Element => {
  const [size, setSize] = useState<number>(getSize());

  useEffect(() => {
    if (editCallback !== undefined) editCallback(id, getDuration());
  }, [size]);

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

  function getSize(): number {
    let s = duration.toString().split(" ")[0];
    let num = parseFloat(s);

    let size = num / 0.5;

    return size * 50;
  }

  function getDuration(): string {
    console.log(size);
    let num = (size / 50) * 0.5;
    return num.toString() + " Hour";
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: {
      id: id,
      eventType: eventType,
      time: time,
      title: title,
      duration: duration,
      date: date,
      type: type,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  }));

  return (
    <Resizable
      onResizeStop={(e, d, r, delta) => {
        console.log("test");
        let roundedSize = Math.ceil((size + delta.height) / 50) * 50;
        setSize(roundedSize);
      }}
      size={{ width: 227.72, height: size }}
      minHeight={50}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div
        className={"eventCard " + eventType}
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="middle">
          {getIcon(eventType)}
          <div className="headerContainers">
            <h1>{time}</h1>
            <h2>{title}</h2>
          </div>
        </div>
        <p>{duration}</p>
      </div>
    </Resizable>
  );
};

export default EventCard;
