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
import axiosInstance from "../utils/axios";
import axios from "axios"; // Remove When switching to axios instance!!
import { eventAdapter } from "../utils/PlannerAdapters";

interface IProps {
  currentTrip: string;
}

interface IState {
  events: plannerEvent[];
}

export class TravelPlanner extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    // Change to use axoisInstance after testing done
    axios
      .get("http://localhost:3000/planner/api/v1/usertrips", {
        params: {
          authid: "12j1iej31",
        },
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((er) => {
        console.log(er);
      });

    axios
      .get("http://localhost:3000/planner/api/v1/alltrips", {
        params: {
          tripid: "623bdb2996a983ea8e7168a9",
        },
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        let events = eventAdapter(res.data);
        this.setState({ events: events });
      });

    this.state = {
      events: [],
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  changeWeek() {}

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
      if (item.id === e.id) {
        let prevItems = [...this.state.events];
        let i = prevItems[index];
        i.date = day;
        i.time = time.toString();
        prevItems[index] = i;
        this.setState({ events: prevItems });
      }
    });

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
              <img src={leftArrow} alt="" onClick={this.changeWeek} />
              <img src={rightArrow} alt="" onClick={this.changeWeek} />
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
                      <PlannerCell
                        dropCallback={this.moveEvent}
                        day={"1"}
                        time={row.time}
                      >
                        {this.placeEvents("1", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallback={this.moveEvent}
                        day={"2"}
                        time={row.time}
                      >
                        {this.placeEvents("2", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallback={this.moveEvent}
                        day={"3"}
                        time={row.time}
                      >
                        {this.placeEvents("3", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallback={this.moveEvent}
                        day={"4"}
                        time={row.time}
                      >
                        {this.placeEvents("4", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallback={this.moveEvent}
                        day={"5"}
                        time={row.time}
                      >
                        {this.placeEvents("5", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallback={this.moveEvent}
                        day={"6"}
                        time={row.time}
                      >
                        {this.placeEvents("6", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallback={this.moveEvent}
                        day={"7"}
                        time={row.time}
                      >
                        {this.placeEvents("7", row.time)}
                      </PlannerCell>
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
