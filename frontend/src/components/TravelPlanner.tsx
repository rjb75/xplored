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
import EventCard, { plannerEvent } from "./EventCard";
import { eventTypes } from "./EventCard";
import PlannerCell from "./PlannerCell";

interface IProps {}

interface IState {
  events: plannerEvent[];
}

export class TravelPlanner extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [
        {
          id: "1",
          type: eventTypes.FOOD,
          title: "Test",
          time: "1",
          duration: "1 Hour",
          date: "1",
        },
        {
          id: "2",
          type: eventTypes.FOOD,
          title: "Test2",
          time: "5",
          duration: "1 Hour",
          date: "2",
        },
      ],
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  placeEvents(day: String, time: String) {
    let res;
    this.state.events.map((e) => {
      if (e.date === day && e.time === time) {
        console.log("test")
        res = (
          <EventCard
            type={e.type}
            title={e.title}
            time={e.time}
            duration={e.duration}
            id={e.id}
            date={e.date}
          />
        );
      }
    });
    return res;
  }

  moveEvent(item: plannerEvent, x: number, y: number) {}

  render() {
    return (
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
                      <PlannerCell day={"1"} time={index}>{this.placeEvents("1", index.toString())}</PlannerCell>
                      <PlannerCell day={"2"} time={index}>{this.placeEvents("2", index.toString())}</PlannerCell>
                      <PlannerCell day={"3"} time={index}>{this.placeEvents("3", index.toString())}</PlannerCell>
                      <PlannerCell day={"4"} time={index}>{this.placeEvents("4", index.toString())}</PlannerCell>
                      <PlannerCell day={"5"} time={index}>{this.placeEvents("5", index.toString())}</PlannerCell>
                      <PlannerCell day={"6"} time={index}>{this.placeEvents("6", index.toString())}</PlannerCell>
                      <PlannerCell day={"7"} time={index}>{this.placeEvents("7", index.toString())}</PlannerCell>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default TravelPlanner;
