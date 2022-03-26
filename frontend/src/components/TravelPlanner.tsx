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
import EventCardHolder from "./EventCardHolder";

interface IProps {
  mode: string;
}

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
          eventType: eventTypes.FOOD,
          title: "Test",
          time: "9:30 am",
          duration: "1 Hour",
          date: "1",
          type: "event",
        },
        {
          id: "2",
          eventType: eventTypes.ACCOMODATION,
          title: "Test2",
          time: "7:00 am",
          duration: "1 Hour",
          date: "2",
          type: "event",
        },
        {
          id: "3",
          eventType: eventTypes.FLIGHT,
          title: "Test2",
          time: "7:00 am",
          duration: "1 Hour",
          date: "3",
          type: "event",
        },
        {
          id: "4",
          eventType: eventTypes.CAR,
          title: "Test2",
          time: "11:00 am",
          duration: "1 Hour",
          date: "4",
          type: "event",
        },
        {
          id: "5",
          eventType: eventTypes.POI,
          title: "Test2",
          time: "10:00 am",
          duration: "1 Hour",
          date: "5",
          type: "event",
        },
      ],
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
  }

  changeWeek() {}

  placeEvents(day: String, time: String) {
    let res;
    this.state.events.map((e) => {
      if (e.date === day && e.time === time) {
        res = (
          <EventCard
            eventType={e.eventType}
            title={e.title}
            time={e.time}
            duration={e.duration}
            id={e.id}
            date={e.date}
            type={e.type}
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
                {days.map((day) => {
                  return <h1>{day.name}</h1>;
                })}
              </div>
              <div className="cellWrapper">
                {timeRows.map((row, index) => {
                  return (
                    <div className="cellContainer">
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={"1"}
                        time={row.time}
                      >
                        {this.placeEvents("1", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={"2"}
                        time={row.time}
                      >
                        {this.placeEvents("2", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={"3"}
                        time={row.time}
                      >
                        {this.placeEvents("3", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={"4"}
                        time={row.time}
                      >
                        {this.placeEvents("4", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={"5"}
                        time={row.time}
                      >
                        {this.placeEvents("5", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        day={"6"}
                        time={row.time}
                      >
                        {this.placeEvents("6", row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
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
