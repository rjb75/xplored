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

/**
 * Enum for types of valid events
 */
export enum eventTypes {
  FOOD = "DIN",
  CAR = "TRANSS",
  FLIGHT = "TRANSL",
  ACCOMODATION = "ACC",
  POI = "POI",
}

/**
 * Describes the props for a plannerEvent
 */
export type plannerEvent = {
  event_id: string;
  type: eventTypes;
  start_time: Date;
  end_time: Date;
  name: string;
  address: string;
  link: string;
  data: string;
  photo_URL: string;
  editSizeCallBack: Function;
  deleteCallBack: Function;
};

/**
 * General Event Card Component, can support any of the event types described
 * in 'eventTypes'.
 * @param Props Required Props
 * @returns An event card
 */
export const EventCard = ({
  event_id,
  type,
  start_time,
  end_time,
  name,
  address,
  link,
  data,
  photo_URL,
  editSizeCallBack,
  deleteCallBack
}: plannerEvent): JSX.Element => {
  const [duration, setDuration] = useState<string>(getDuration());
  const [size, setSize] = useState<number>(getSize());
  const [displayTime, setDisplayTime] = useState<string>(getDisplayTime());

  useEffect(() => {
    let durHours = size / 100;
    if (editSizeCallBack !== undefined) editSizeCallBack(event_id, durHours);
  }, [size]);

  /**
   * Returns Icon for the given eventType
   * @param eventType
   * @returns Img tag of the icon
   */
  function getIcon(eventType: eventTypes) {
    switch (eventType) {
      case "DIN":
        return <img src={foodIcon} alt="" />;
      case "TRANSS":
        return <img src={carIcon} alt="" />;
      case "TRANSL":
        return <img src={flightIcon} alt="" />;
      case "ACC":
        return <img src={accommodationIcon} alt="" />;
      case "POI":
        return <img src={POIIcon} alt="" />;
      default:
        break;
    }
  }

  function getDisplayTime() {
    let hour = start_time.getUTCHours();
    let pm = "am";
    if (hour > 12) {
      hour -= 12;
      pm = "pm";
    } else if (hour === 0) hour = 12;

    let mins = start_time.getUTCMinutes();
    let minsString = mins.toString();
    if (mins < 10) minsString = "0" + mins;

    return hour.toString() + ":" + minsString + " " + pm;
  }

  function getSize(): number {
    let s = duration.toString().split(" ")[0];
    let num = parseFloat(s);

    let size = num / 0.5;

    return size * 50;
  }

  function getDuration(): string {
    let delta = end_time.getTime() - start_time.getTime();
    return (delta / 60 / 60 / 1000).toString() + " Hours";
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: {
      event_id: event_id,
      type: type,
      start_time: start_time,
      end_time: end_time,
      name: name,
      address: address,
      link: link,
      data: data,
      photo_URL: photo_URL,
      itemType: "event",
      duration: duration,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  }));

  return (
    <Resizable
      onResizeStop={(e, d, r, delta) => {
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
        className={"eventCard " + type}
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="middle">
          {getIcon(type)}
          <div className="headerContainers">
            <h1>{displayTime}</h1>
            <h2>{name}</h2>
          </div>
        </div>
        <div className="right">
          <p>{duration}</p>
          <h2 onClick={() => deleteCallBack(event_id)}>x</h2>
        </div>
      </div>
    </Resizable>
  );
};

export default EventCard;
