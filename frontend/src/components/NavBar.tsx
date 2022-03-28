import React, { useEffect, useState } from "react";
import InputField from "./inputs/InputField";
import DatePicker from "react-datepicker";
import "./NavBar.scss";
//@ts-ignore
import Logo from "../images/logo.svg";
import Select from "react-select";
import axiosInstance from "../utils/axios";
import { Modal, Button, OverlayTrigger, Popover } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


interface NavProps {
  mode: string;
  changeMode: Function;
  changeTripId: Function;
}

const NavBar = ({ mode, changeMode, changeTripId }: NavProps) => {
  const travelTypes = [
    {
      name: "Flights",
      icon: "flight",
      action: () => {},
    },
    {
      name: "Car",
      icon: "automotive",
      action: () => {},
    },
    {
      name: "Food",
      icon: "food",
      action: () => {},
    },
    {
      name: "Hotels",
      icon: "accommodation",
      action: () => {},
    },
    {
      name: "Attraction",
      icon: "attraction",
      action: () => {},
    },
  ];

  interface TripOptions {
    label: string;
    value: string;
  }

  const [showNewTrip, setShowNewTrip] = useState<boolean>(false);
  const handleShow = () => setShowNewTrip(true);
  const handleClose = () => setShowNewTrip(false);

  const [trips, setTrips] = useState<Array<TripOptions>>([]);
  const [currTrip, setCurrTrip] = useState<TripOptions>();

  useEffect(() => {
    axiosInstance
      .get("/api/v1/trips")
      .then((res) => {
        Array.isArray(res.data) &&
          setTrips(
            res.data.map((t, i) => {
              if (i === 0) {
                setCurrTrip({ label: t.name, value: t.trip_id });
              }
              return { label: t.name, value: t.trip_id };
            })
          );
      })
      .catch((err) => console.log(err));
  }, []);

  const testFunc = () => {};

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  function updateCurrentTrip(e: any) {
    if (e.value && e.label) {
      setCurrTrip({ value: e.value, label: e.label });
      return { value: e.value, label: e.label };
    }
  }

  function addTrip() {}

  useEffect(() => {
    changeTripId(currTrip?.value);
  }, [currTrip]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className="navbar navbar--container">
        <div className="navbar--primary-row">
          <div className="navbar--left-control">
            <img src={Logo} alt={`Xplored Logo`} />
            <div style={{ display: `flex`, alignItems: `center`, gap: `20px` }}>
              <Select
                className="navbar--trip-selector"
                options={trips}
                defaultValue={trips[0]}
                value={currTrip}
                onChange={updateCurrentTrip}
              />
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
              >
                <h1
                  style={{ fontSize: `25px`, fontWeight: `600` }}
                >
                  +
                </h1>
              </OverlayTrigger>
            </div>
          </div>
          <div className="navbar--trip-fields">
            <div className="navbar--trip-field-container">
              <i className="icon-home navbar--trip-field-icon" />
              <InputField
                className="navbar--trip-field"
                name="Departure Location"
                placeholder="Calgary, AB"
                onChangeHandler={testFunc}
              />
            </div>
            <div className="navbar--trip-field-container">
              <i className="icon-marker navbar--trip-field-icon" />
              <InputField
                className="navbar--trip-field"
                name="Destination"
                placeholder="Seattle, WA"
                onChangeHandler={testFunc}
              />
            </div>
            <div className="navbar--trip-field-container">
              <i className="icon-calendar-date navbar--trip-field-icon" />
              <DatePicker
                className="navbar--trip-field"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                startDate={startDate}
                endDate={endDate}
                selectsStart
              />
            </div>
            <div className="navbar--trip-field-container">
              <i className="icon-calendar-date navbar--trip-field-icon" />
              <DatePicker
                className="navbar--trip-field"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                selectsEnd
              />
            </div>
          </div>
          <div className="navbar--right-control">
            <button className="navbar--profile-link">
              View Profile <i className="icon-avatar" />
            </button>
          </div>
        </div>
        <div className="navbar--type-selector">
          {travelTypes.map((e, i) => {
            return (
              <button
                className={`navbar--type-button icon-${e.icon} ${
                  mode === e.name ? "active" : ""
                }`}
                key={i}
                onClick={() => {
                  changeMode(e.name);
                  e.action();
                }}
              />
            );
          })}
        </div>
      </div>
      <Modal show={showNewTrip} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
