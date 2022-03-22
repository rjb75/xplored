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
          time: "9:30 am",
          duration: "1 Hour",
          date: "1",
        },
        {
          id: "2",
          type: eventTypes.FOOD,
          title: "Test2",
          time: "7:00 am",
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

  moveEvent(item: plannerEvent, day: String, time: String) {
    this.state.events.forEach((e, index) => {
      if(item.id === e.id){
        let prevItems = [...this.state.events];
        let i = prevItems[index];
        i.date = day;
        i.time = time.toString();
        prevItems[index] = i;
        this.setState({events: prevItems});
      }
    })

    // Update backend
  }

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
                      <PlannerCell dropCallback={this.moveEvent} day={"1"} time={row.time}>{this.placeEvents("1", row.time)}</PlannerCell>
                      <PlannerCell dropCallback={this.moveEvent} day={"2"} time={row.time}>{this.placeEvents("2", row.time)}</PlannerCell>
                      <PlannerCell dropCallback={this.moveEvent} day={"3"} time={row.time}>{this.placeEvents("3", row.time)}</PlannerCell>
                      <PlannerCell dropCallback={this.moveEvent} day={"4"} time={row.time}>{this.placeEvents("4", row.time)}</PlannerCell>
                      <PlannerCell dropCallback={this.moveEvent} day={"5"} time={row.time}>{this.placeEvents("5", row.time)}</PlannerCell>
                      <PlannerCell dropCallback={this.moveEvent} day={"6"} time={row.time}>{this.placeEvents("6", row.time)}</PlannerCell>
                      <PlannerCell dropCallback={this.moveEvent} day={"7"} time={row.time}>{this.placeEvents("7", row.time)}</PlannerCell>
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
