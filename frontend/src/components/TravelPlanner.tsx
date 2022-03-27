import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  days,
  timeRows,
  dateObjToDisplayTime,
  eventAdapter,
  dateToDayString,
  dateToMonthString,
  displayTimeToDateObj,
} from "../utils/PlannerConstants";
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
import EventCardHolder from "./EventCardHolder";
import axios from "axios";

interface IProps {
  mode: string;
}

interface IState {
  events: plannerEvent[];
  week: Date[];
}

export class TravelPlanner extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

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
      week: this.getWeek(),
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
  }

  getWeek(): Date[] {
    let ret: Date[] = [];
    let today = new Date();
    console.log(today);
    for (let i = 0; i < 7; i++) {
      let day: Date = new Date(today);
      day.setUTCDate(day.getUTCDate() - day.getUTCDay() + i);
      ret.push(day);
    }

    return ret;
  }

  changeWeek() {}

  placeEvents(day: number, time: String) {
    let res;
    this.state.events.map((e) => {
      let t = dateObjToDisplayTime(e.start_time);
      console.log(t)
      if (e.start_time.getUTCDay() === day && t === time) {
        res = (
          <EventCard
            event_id={e.event_id}
            type={e.type}
            start_time={e.start_time}
            end_time={e.end_time}
            name={e.name}
            address={e.address}
            link={e.link}
            data={e.data}
            photo_URL={e.photo_URL}
          />
        );
      }
    });
    return res;
  }

  moveEvent(item: plannerEvent, day: number, time: string) {
    this.state.events.forEach((e, index) => {
      if (item.event_id === e.event_id) {
        let prevItems = [...this.state.events];
        let i = prevItems[index];

        let duration = item.end_time.getTime() - item.start_time.getTime();
        duration = duration/1000/60;
        let mins = duration%60;
        let hours = Math.floor(duration/60);

        let start = displayTimeToDateObj(time, this.state.week[day].getUTCMonth(), this.state.week[day].getUTCDate(), this.state.week[day].getUTCFullYear());
        let end = new Date(start);
        end.setUTCHours(end.getUTCHours() + hours);
        end.setUTCMinutes(end.getUTCMinutes() + mins);

        i.start_time = start;
        i.end_time = end;
        prevItems[index] = i;
        this.setState({ events: prevItems });
      }
    });

    // Update backend
  }

  editEvent(id: string, duration?: string) {
    let event = this.state.events.filter((item) => item.id === id)[0];

    if (duration !== undefined) {
      event.duration = duration;
    }

    let oldState = this.state.events.filter((item) => item.id !== id);
    oldState.push(event);
    this.setState({ events: oldState });
  }

  newEvent(title: string, day: string, time: string) {
    let mode: eventTypes;
    switch (this.props.mode) {
      case "flight":
        mode = eventTypes.FLIGHT;
        break;
      case "car":
        mode = eventTypes.CAR;
        break;
      case "accomodation":
        mode = eventTypes.ACCOMODATION;
        break;
      case "food":
        mode = eventTypes.FOOD;
        break;
      case "poi":
        mode = eventTypes.POI;
        break;

      default:
        mode = eventTypes.FLIGHT;
        break;
    }

    let newEvent: plannerEvent = {
      time: time,
      date: day,
      title: title,
      duration: "1 Hour",
      eventType: mode,
      id: "6",
      type: "event",
    };

    let oldState = this.state.events;
    oldState.push(newEvent);
    this.setState({ events: oldState });
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
            <EventCardHolder
              selectedMode={this.props.mode}
              eventHandler={this.newEvent}
            />
            <div className="timeWrapper">
              {timeRows.map((row) => {
                return <div className="time">{row.time}</div>;
              })}
            </div>
            <div className="table">
              <div className="daysWrapper">
                {this.state.week.map((day) => {
                  return <h1>{dateToDayString(day) + ", " + dateToMonthString(day) + " " + day.getDate()}</h1>;
                })}
              </div>
              <div className="cellWrapper">
                {timeRows.map((row, index) => {
                  return (
                    <div className="cellContainer">
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={0}
                        time={row.time}
                      >
                        {this.placeEvents(0, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={1}
                        time={row.time}
                      >
                        {this.placeEvents(1, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={2}
                        time={row.time}
                      >
                        {this.placeEvents(2, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={3}
                        time={row.time}
                      >
                        {this.placeEvents(3, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={4}
                        time={row.time}
                      >
                        {this.placeEvents(4, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={5}
                        time={row.time}
                      >
                        {this.placeEvents(5, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={6}
                        time={row.time}
                      >
                        {this.placeEvents(6, row.time)}
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
