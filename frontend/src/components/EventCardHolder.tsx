import React, { useState, useEffect } from "react";
import "./EventCard.scss";
import DatePicker from "react-datepicker";
import FlightCard from "./FlightCard";
import CarCard from "./CarCard";
import FoodCard from "./FoodCard";
import HotelsCard from "./HotelsCard";
import AttractionCard from "./AttractionCard";
import Chevron from "../assets/chevron.svg";
import axiosInstance from "../utils/axios";

interface CardHolderProps {
    selectedMode: string;
    eventHandler: Function;
}

export default function EventCardHolder({
    selectedMode = "Flights",
    eventHandler,
}: CardHolderProps) {
    const [holderOpen, setHolderOpen] = React.useState(false);

    function swapHolderOpen() {
        setHolderOpen(!holderOpen);
    }

    function holderLabel() {
        switch (selectedMode) {
            case "Flights":
                return "Long-Distance Travel";
            case "Car":
                return "Short-Distance Travel";
            case "Food":
                return "Dining";
            case "Hotels":
                return "Accomodation";
            case "Attraction":
                return "POI";
            default:
                return "";
        }
    }

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    function holderProperties() {
        // Okay listen I could do this way better with map but I don't feel like it >:(
        switch (selectedMode) {
            case "Flights":
            case "Car":
                return (
                    <>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Departure Location
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                placeholder="Where are you starting?"
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Departure Date
                            </p>
                            <i className="icon-calendar-date card--holder-bar-property-icon" />
                            <DatePicker
                                className="card--holder-bar-property-input"
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Add date"
                                selectsStart
                                wrapperClassName="card--holder-bar-property-input"
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Destination
                            </p>
                            <i className="icon-marker card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                placeholder="Where are you going?"
                            />
                        </li>
                    </>
                );
            case "Food":
                return (
                    <>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Search for Restaurant?
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                placeholder="What do you want to eat?"
                            />
                        </li>
                    </>
                );
            case "Hotels":
                return (
                    <>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Where?
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                placeholder="Where are you starting?"
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Check in
                            </p>
                            <i className="icon-calendar-date card--holder-bar-property-icon" />
                            <DatePicker
                                className="card--holder-bar-property-input"
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Add date"
                                selectsStart
                                wrapperClassName="card--holder-bar-property-input"
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Check out
                            </p>
                            <i className="icon-calendar-date card--holder-bar-property-icon" />
                            <DatePicker
                                className="card--holder-bar-property-input"
                                selected={endDate}
                                onChange={(date: Date) => setEndDate(date)}
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Add date"
                                selectsEnd
                                wrapperClassName="card--holder-bar-property-input"
                            />
                        </li>
                    </>
                );
            case "Attraction":
                return (
                    <>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Key words
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                placeholder="Where are you starting?"
                            />
                        </li>
                    </>
                );
            default:
                return <></>;
        }
    }

    function holderExtras() {
        switch (selectedMode) {
            case "Flights":
            case "Car":
                return (
                    <>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-travelers"
                                className="card--holder-bar-extra-text">
                                <option value="1">1 traveler</option>
                                <option value="2">2 travelers</option>
                                <option value="3">3 travelers</option>
                                <option value="4">4 travelers</option>
                                {/* Sorry, if you've got more than 4 people then you're wrong */}
                            </select>
                        </li>
                    </>
                );
            case "Food":
                return (
                    <>
                        <li className="card--holder-extra-text">
                            <select
                                name="diet-restrictions"
                                className="card--holder-bar-extra-dropdown">
                                <option value="1">Dietary Restrictions</option>
                                <option value="2">Peanut Allergy</option>
                                <option value="3">Lactose Intolerant</option>
                                <option value="4">Vegan</option>
                                <option value="5">Halal</option>
                                {/* TODO: make this into a dropdown so multiple items can be selected */}
                            </select>
                        </li>
                        <li className="card--holder-extra-text card--holder-extra-dropdown">
                            <select
                                name="food-category"
                                className="card--holder-bar-extra-dropdown">
                                <option value="1">Category</option>
                                <option value="2">Italian</option>
                                <option value="3">Japanese</option>
                                <option value="4">Chinese</option>
                                <option value="5">Indian</option>
                                {/* TODO: properly style this section */}
                            </select>
                        </li>
                    </>
                );
            case "Hotels":
                return (
                    <>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-rooms"
                                className="card--holder-bar-extra-text">
                                <option value="1">1 Room</option>
                                <option value="2">2 Rooms</option>
                                <option value="3">3 Rooms</option>
                            </select>
                        </li>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-adults"
                                className="card--holder-bar-extra-text">
                                <option value="1">1 Adult</option>
                                <option value="2">2 Adults</option>
                                <option value="3">3 Adults</option>
                                <option value="4">4 Adults</option>
                            </select>
                        </li>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-children"
                                className="card--holder-bar-extra-text">
                                <option value="1">0 Children</option>
                                <option value="2">1 Child</option>
                                <option value="3">2 Children</option>
                                <option value="4">3 Children</option>
                                <option value="5">4 Children</option>
                            </select>
                        </li>
                    </>
                );
            case "Attraction":
                return <></>;
            default:
                return <></>;
        }
    }

    const [eventCards, setEventCards] = useState(<></>);

    function getCardsFromAPI() {
        switch (selectedMode) {
            case "Flights":
                axiosInstance
                    .get("/api/v1/pois", {
                        params: {
                            address: "2500 University Drive NW",
                            keyword: "Cafe",
                            radius: 1000,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                break;
            case "Car":
                axiosInstance
                    .get("/transportation/api/v1/short")
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                break;
            case "Food":
                axiosInstance
                    .get("/dining/api/v1")
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                break;
            case "Hotels":
                axiosInstance
                    .get("/accom/api/v1")
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                break;
            case "Attraction":
                axiosInstance
                    .get("/poi/api/v1")
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getCardsFromAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMode]);

    return (
        <>
            {!holderOpen && (
                <div className="card--holder-button" onClick={swapHolderOpen}>
                    <img src={Chevron} alt={`open menu`} />
                </div>
            )}
            {holderOpen && (
                <div className="card--holder">
                    <div className="card--holder-bar">
                        <img
                            src={Chevron}
                            className="card--holder-bar-close"
                            alt={`close menu`}
                            onClick={swapHolderOpen}
                        />
                        <h1 className="card--holder-bar-title">
                            {holderLabel()}
                        </h1>
                        <ul className="card--holder-bar-properties-list">
                            {holderProperties()}
                        </ul>
                        <i
                            className="card--holder-bar-close"
                            onClick={swapHolderOpen}
                        />
                        <ul className="card--holder-bar-extra-settings">
                            {holderExtras()}
                        </ul>
                    </div>
                    <ul className="card--holder-list">
                        <FlightCard addCardFunction={eventHandler} />
                        {eventCards}
                    </ul>
                </div>
            )}
        </>
    );
}
