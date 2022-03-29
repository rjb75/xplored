import React, { useEffect, useState } from "react";
import InputField from "./inputs/InputField";
import DatePicker from "react-datepicker";
import "./NavBar.scss";
import Modal from "react-modal";

//@ts-ignore
import Logo from "../images/logo.svg";
import Select from "react-select";
import axiosInstance from "../utils/axios";

interface NavProps {
  mode: string;
  changeMode: Function;
  changeTripId: Function;
}

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
  },
};

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

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
  const [tripName, setTripName] = useState<string>();

  function updateCurrentTrip(e: any) {
    if (e.value && e.label) {
      setCurrTrip({ value: e.value, label: e.label });
      return { value: e.value, label: e.label };
    }
  }

  function addTrip() {
    axiosInstance.post("/api/v1/trip", {
      name: tripName,
      events: [],
      photo_url: "bruh"
    })
    closeModal();
  }

  useEffect(() => {
    changeTripId(currTrip?.value);
  }, [currTrip]);

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
              <h1
                onClick={openModal}
                style={{ fontSize: `25px`, fontWeight: `600`, cursor: `pointer` }}
              >
                +
              </h1>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modalContainer">
          <h1>Add new trip</h1>
            <InputField
              className="navbar--trip-field input"
              name="Destination"
              placeholder="Seattle Trip"
              onChangeHandler={setTripName}
            />
          <div className="button" onClick={addTrip}><h2>Add Trip</h2></div>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
