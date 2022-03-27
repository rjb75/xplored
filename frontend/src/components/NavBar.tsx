import React, { useEffect, useState } from "react";
import InputField from "./inputs/InputField";
import DatePicker from "react-datepicker";
import "./NavBar.scss";
import Logo from "../images/logo.svg";
import Select from "react-select";
import axiosInstance from "../utils/axios";

const NavBar: React.FC = () => {
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

    const [selectedMode, setSelectedMode] = useState("Flights");
    interface TripOptions {
        label: string,
        value: string,
    };

    const [trips, setTrips] = useState<Array<TripOptions>>([]);

    useEffect(() => {
        axiosInstance
        .get('/api/v1/trips')
        .then((res) => {
            Array.isArray(res.data) && setTrips(res.data.map((t) => {
                return {label: t.name, value: t.trip_id}
            }))
        })
        .catch((err) => console.log(err))
    }, [])

    const testFunc = () => {};

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    return (
        <div className="navbar navbar--container">
            <div className="navbar--primary-row">
                <div className="navbar--left-control">
                    <img src={Logo} alt={`Xplored Logo`} />
                    <Select
                        className="navbar--trip-selector"
                        options={trips}
                        defaultValue={trips[0]}
                    />
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
                    const onClickAction = () => {
                        setSelectedMode(e.name);
                        e.action();
                    };

                    return (
                        <button
                            className={`navbar--type-button icon-${e.icon} ${
                                selectedMode === e.name ? "active" : ""
                            }`}
                            key={i}
                            onClick={onClickAction}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default NavBar;
