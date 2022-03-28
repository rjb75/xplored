import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
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
import axiosInstance from "../utils/axios";

interface IProps {
  mode: string;
  tripId: string;
}

interface IState {
  events: plannerEvent[];
  week: Date[];
  currTripId: string | null;
}

export class TravelPlanner extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
      week: this.getWeek(),
      currTripId: this.props.tripId,
    };

    if (this.props.tripId !== "") {
      console.log(this.props.tripId);
      axiosInstance
        .get("/api/v1/trip/events", {
          params: {
            tripid: this.props.tripId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            events: eventAdapter(res.data, this.editEventSize),
          });
        });
    }

    this.deleteEvent = this.deleteEvent.bind(this);
    this.moveEvent = this.moveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.editEventSize = this.editEventSize.bind(this);
    this.newEventSetDate = this.newEventSetDate.bind(this);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.tripId !== this.props.tripId) {
      axiosInstance
        .get("/api/v1/trip/events", {
          params: {
            tripid: this.props.tripId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            events: eventAdapter(res.data, this.editEventSize),
          });
        });
    }
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

  changeWeek(way: string) {
    if (way === "f") {
      let week = this.state.week;
      week.forEach((day) => {
        day.setUTCDate(day.getUTCDate() + 7);
      });
      this.setState({
        events: this.state.events,
        week: week,
      });
    } else {
      let week = this.state.week;
      week.forEach((day) => {
        day.setUTCDate(day.getUTCDate() - 7);
      });
      this.setState({
        events: this.state.events,
        week: week,
      });
    }
  }

  placeEvents(day: number, time: String) {
    let res;
    this.state.events.map((e) => {
      let t = dateObjToDisplayTime(e.start_time);
      let inWeek: boolean = false;

      if (this.state.week[day].getUTCDate() === e.start_time.getUTCDate())
        inWeek = true;

      if (e.start_time.getUTCDay() === day && t === time && inWeek) {
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
            editSizeCallBack={this.editEventSize}
            deleteCallBack={this.deleteEvent}
          />
        );
      }
    });
    return res;
  }

  deleteEvent(itemid: string){
    let oldEvents = this.state.events.filter((item) => item.event_id !== itemid);
    this.setState({ events: oldEvents });

    axiosInstance.delete("/api/v1/event", {
      params: {
        eventid: itemid,
        tripid: this.props.tripId
      }
    })

  }

  moveEvent(item: plannerEvent, day: number, time: string) {
    let i: plannerEvent = item;
    this.state.events.forEach((e, index) => {
      if (item.event_id === e.event_id) {
        let prevItems = [...this.state.events];
        i = prevItems[index];

        let duration = item.end_time.getTime() - item.start_time.getTime();
        duration = duration / 1000 / 60;
        let mins = duration % 60;
        let hours = Math.floor(duration / 60);

        let start = displayTimeToDateObj(
          time,
          this.state.week[day].getUTCMonth(),
          this.state.week[day].getUTCDate(),
          this.state.week[day].getUTCFullYear()
        );
        let end = new Date(start);
        end.setUTCHours(end.getUTCHours() + hours);
        end.setUTCMinutes(end.getUTCMinutes() + mins);

        i.start_time = start;
        i.end_time = end;
        prevItems[index] = i;
        this.setState({ events: prevItems });
      }
    });

    axiosInstance
      .post(
        "/api/v1/event/edit",
        {
          type: i.type,
          start_time: i.start_time,
          end_time: i.end_time,
          name: i.name,
          address: i.address,
          link: i.link,
          data: i.data,
          photo_URL: i.photo_URL,
        },
        {
          params: {
            eventid: i.event_id,
          },
        }
      )
      .catch((e) => {
        console.log(e);
      });
  }

  editEventSize(id: string, duration: number) {
    let event = this.state.events.filter((item) => item.event_id === id)[0];

    let hours = Math.floor(duration);
    let mins = (duration % 1) * 60;

    event.end_time.setUTCHours(event.start_time.getUTCHours() + hours);
    event.end_time.setUTCMinutes(event.start_time.getUTCMinutes() + mins);

    let oldState = this.state.events.filter((item) => item.event_id !== id);
    oldState.push(event);
    this.setState({ events: oldState });

    axiosInstance
      .post(
        "/api/v1/event/edit",
        {
          type: event.type,
          start_time: event.start_time,
          end_time: event.end_time,
          name: event.name,
          address: event.address,
          link: event.link,
          data: event.data,
          photo_URL: event.photo_URL,
        },
        {
          params: {
            eventid: event.event_id,
          },
        }
      )
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Creates a new planner event
   * @param name name of the event 
   * @param type type of the event 
   * @param day what day (0-6 representing sunday-saturday)
   * @param start_time start time in the format of display time (eg. 6:00 am, 8:30 pm)
   * @param duration Optional. Should be in form "x.y Hours" where x is hours and y is remainder (eg. 1.5 hours is one hour, 30 mins)
   */
  newEvent(
    name: string,
    type: eventTypes,
    day: number,
    start_time: string,
    duration?: string
  ) {
    let start = displayTimeToDateObj(
      start_time,
      this.state.week[day].getUTCDay(),
      day,
      this.state.week[day].getUTCFullYear()
    );
    let end: Date = displayTimeToDateObj(
      start_time,
      this.state.week[day].getUTCDay(),
      day,
      this.state.week[day].getUTCFullYear()
    );
    if (duration !== undefined) {
      //todo
    } else {
      end.setUTCMinutes(end.getUTCMinutes() + 30);
    }

    axiosInstance
      .post(
        "/api/v1/event/create",
        {
          type: type,
          start_time: start,
          end_time: end,
          name: name,
          address: null,
          link: null,
          data: null,
          photo_url: null,
        },
        {
          params: {
            tripid: this.state.currTripId,
          },
        }
      )
      .then((res) => {
        let oldState = this.state.events;
        oldState.push(eventAdapter([res.data], this.editEventSize)[0]);
        this.setState({ events: oldState });
      });
  }

  /**
   * Creates a new event with preset start and end time.
   * @param name 
   * @param type 
   * @param day 
   * @param start_time 
   * @param end_time 
   */
  newEventSetDate(
    name: string,
    type: eventTypes,
    day: number,
    start_time: Date,
    end_time: Date
  ) {
    axiosInstance
      .post(
        "/api/v1/event/create",
        {
          type: type,
          start_time: start_time,
          end_time: end_time,
          name: name,
          address: null,
          link: null,
          data: null,
          photo_url: null,
        },
        {
          params: {
            tripid: this.state.currTripId,
          },
        }
      )
      .then((res) => {
        let oldState = this.state.events;
        oldState.push(eventAdapter([res.data], this.editEventSize)[0]);
        this.setState({ events: oldState });
      });
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
                <h1>
                  {dateToMonthString(this.state.week[0]) +
                    " " +
                    this.state.week[0].getUTCDate() +
                    " - " +
                    dateToMonthString(this.state.week[6]) +
                    " " +
                    this.state.week[6].getUTCDate() +
                    " " +
                    this.state.week[6].getUTCFullYear()}
                </h1>
              </div>
            </div>
            <div className="arrowWrapper">
              <img
                src={leftArrow}
                alt=""
                onClick={() => this.changeWeek("b")}
              />
              <img
                src={rightArrow}
                alt=""
                onClick={() => this.changeWeek("f")}
              />
            </div>
          </div>

          <div className="planner">
            <EventCardHolder
              selectedMode={this.props.mode}
              eventHandler={this.newEvent}
            />
            <div className="timeWrapper">
              {timeRows.map((row, index) => {
                return (
                  <div key={index} className="time">
                    {row.time}
                  </div>
                );
              })}
            </div>
            <div className="table">
              <div className="daysWrapper">
                {this.state.week.map((day, index) => {
                  return (
                    <h1 key={index}>
                      {dateToDayString(day) +
                        ", " +
                        dateToMonthString(day) +
                        " " +
                        day.getDate()}
                    </h1>
                  );
                })}
              </div>
              <div className="cellWrapper">
                {timeRows.map((row, index) => {
                  return (
                    <div key={index} className="cellContainer">
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        dropCallbackNewSetDateEvent={this.newEventSetDate}
                        day={0}
                        time={row.time}
                      >
                        {this.placeEvents(0, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        dropCallbackNewSetDateEvent={this.newEventSetDate}
                        day={1}
                        time={row.time}
                      >
                        {this.placeEvents(1, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        dropCallbackNewSetDateEvent={this.newEventSetDate}
                        day={2}
                        time={row.time}
                      >
                        {this.placeEvents(2, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        dropCallbackNewSetDateEvent={this.newEventSetDate}
                        day={3}
                        time={row.time}
                      >
                        {this.placeEvents(3, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        dropCallbackNewSetDateEvent={this.newEventSetDate}
                        day={4}
                        time={row.time}
                      >
                        {this.placeEvents(4, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        dropCallbackNewSetDateEvent={this.newEventSetDate}
                        day={5}
                        time={row.time}
                      >
                        {this.placeEvents(5, row.time)}
                      </PlannerCell>
                      <PlannerCell
                        dropCallbackMove={this.moveEvent}
                        dropCallbackNewEvent={this.newEvent}
                        dropCallbackNewSetDateEvent={this.newEventSetDate}
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
