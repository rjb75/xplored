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
import { getSystemErrorName } from "util";

interface CardHolderProps {
    selectedMode: string;
    eventHandler: Function;
}

export default function EventCardHolder({
    selectedMode,
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

    /* List of all possible properties that have been selected by users (there's probably a better way of doing this) */
    // Flights Properties //
    const [flightsHome, setFlightsHome] = useState("");
    const [flightsDate, setFlightsDate] = useState(new Date());
    const [flightsDest, setFlightsDest] = useState("");
    const [flightsNumTravelers, setFlightsNumTravelers] = useState("1");

    // Car Properties //
    const [carHome, setCarHome] = useState("");
    const [carDate, setCarDate] = useState(new Date());
    const [carDest, setCarDest] = useState("");
    const [carNumTravelers, setCarNumTravelers] = useState("1");

    // Food Properties //
    const [foodName, setFoodName] = useState("");
    const [foodRestrictions, setFoodRestrictions] = useState("");
    const [foodCategories, setFoodCategories] = useState("");
    const [foodLocation, setFoodLocation] = useState("");

    // Hotels Properties //
    const [hotelsLocation, setHotelsLocation] = useState("");
    const [hotelsTimeIn, setHotelsTimeIn] = useState(new Date());
    const [hotelsTimeOut, setHotelsTimeOut] = useState(new Date());
    const [hotelsNumRooms, setHotelsNumRooms] = useState("1");
    const [hotelsNumAdults, setHotelsNumAdults] = useState("1");
    const [hotelsNumKids, setHotelsNumKids] = useState("0");

    // Attraction Properties //
    const [attractionKeywords, setAttractionKeywords] = useState("");
    const [attractionLocation, setAttractionLocation] = useState("");

    function holderProperties() {
        // Okay listen I could do this way better with map but I don't feel like it >:(
        switch (selectedMode) {
            case "Flights":
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
                                value={flightsHome}
                                onChange={(evt) =>
                                    setFlightsHome(evt.target.value)
                                }
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Departure Date
                            </p>
                            <i className="icon-calendar-date card--holder-bar-property-icon" />
                            <DatePicker
                                className="card--holder-bar-property-input"
                                selected={flightsDate}
                                onChange={(date: Date) => setFlightsDate(date)}
                                startDate={flightsDate}
                                placeholderText="Add date"
                                selectsStart
                                dateFormat="dd-MM-yyyy"
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
                                value={flightsDest}
                                placeholder="Where are you going?"
                                onChange={(evt) =>
                                    setFlightsDest(evt.target.value)
                                }
                            />
                        </li>
                    </>
                );
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
                                value={carHome}
                                placeholder="Where are you starting?"
                                onChange={(evt) => setCarHome(evt.target.value)}
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Departure Date
                            </p>
                            <i className="icon-calendar-date card--holder-bar-property-icon" />
                            <DatePicker
                                className="card--holder-bar-property-input"
                                selected={carDate}
                                onChange={(date: Date) => setCarDate(date)}
                                startDate={carDate}
                                placeholderText="Add date"
                                selectsStart
                                dateFormat="dd-MM-yyyy"
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
                                value={carDest}
                                placeholder="Where are you going?"
                                onChange={(evt) => setCarDest(evt.target.value)}
                            />
                        </li>
                    </>
                );
            case "Food":
                return (
                    <>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Location
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                value={foodLocation}
                                placeholder="Where are you looking for?"
                                onChange={(evt) =>
                                    setFoodLocation(evt.target.value)
                                }
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Search for Restaurant?
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                value={foodName}
                                placeholder="What do you want to eat?"
                                onChange={(evt) =>
                                    setFoodName(evt.target.value)
                                }
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
                                value={hotelsLocation}
                                placeholder="Where are you starting?"
                                onChange={(evt) =>
                                    setHotelsLocation(evt.target.value)
                                }
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Check in
                            </p>
                            <i className="icon-calendar-date card--holder-bar-property-icon" />
                            <DatePicker
                                className="card--holder-bar-property-input"
                                selected={hotelsTimeIn}
                                onChange={(date: Date) => setHotelsTimeIn(date)}
                                startDate={hotelsTimeIn}
                                endDate={hotelsTimeOut}
                                placeholderText="Add date"
                                selectsStart
                                dateFormat="dd-MM-yyyy"
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
                                selected={hotelsTimeOut}
                                onChange={(date: Date) =>
                                    setHotelsTimeOut(date)
                                }
                                startDate={hotelsTimeIn}
                                endDate={hotelsTimeOut}
                                placeholderText="Add date"
                                selectsEnd
                                dateFormat="dd-MM-yyyy"
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
                                Location
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                value={attractionLocation}
                                placeholder="Where are you starting?"
                                onChange={(evt) =>
                                    setAttractionLocation(evt.target.value)
                                }
                            />
                        </li>
                        <li className="card--holder-bar-property">
                            <p className="card--holder-bar-property-label">
                                Key words
                            </p>
                            <i className="icon-home card--holder-bar-property-icon" />
                            <input
                                className="card--holder-bar-property-input"
                                type="text"
                                value={attractionKeywords}
                                placeholder="Where are you looking for?"
                                onChange={(evt) =>
                                    setAttractionKeywords(evt.target.value)
                                }
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
                return (
                    <>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-travelers"
                                className="card--holder-bar-extra-text"
                                value={flightsNumTravelers}
                                onChange={(evt) => {
                                    setFlightsNumTravelers(evt.target.value);
                                }}>
                                <option value="1">1 traveler</option>
                                <option value="2">2 travelers</option>
                                <option value="3">3 travelers</option>
                                <option value="4">4 travelers</option>
                                {/* Sorry, if you've got more than 4 people then you're wrong */}
                            </select>
                        </li>
                    </>
                );
            case "Car":
                return (
                    <>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-travelers"
                                className="card--holder-bar-extra-text"
                                value={carNumTravelers}
                                onChange={(evt) => {
                                    setCarNumTravelers(evt.target.value);
                                }}>
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
                                className="card--holder-bar-extra-dropdown"
                                value={foodRestrictions}
                                onChange={(evt) => {
                                    setFoodRestrictions(evt.target.value);
                                }}>
                                <option value="">Dietary Restrictions</option>
                                <option value="kids">Kids</option>
                                <option value="halal">Halal</option>
                                <option value="vegan">Vegan</option>
                                <option value="kosher">Kosher</option>
                                <option value="gluten-free">Gluten Free</option>
                                {/* TODO: make this into a dropdown so multiple items can be selected */}
                            </select>
                        </li>
                        <li className="card--holder-extra-text card--holder-extra-dropdown">
                            <select
                                name="food-category"
                                className="card--holder-bar-extra-dropdown"
                                value={foodCategories}
                                onChange={(evt) => {
                                    setFoodCategories(evt.target.value);
                                }}>
                                <option value="">Category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snacks">Snacks</option>
                                <option value="drinks">Drinks</option>
                                <option value="bubbletea">Bubble Tea</option>
                                <option value="brunch">Brunch</option>
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
                                className="card--holder-bar-extra-text"
                                value={hotelsNumRooms}
                                onChange={(evt) => {
                                    setHotelsNumRooms(evt.target.value);
                                }}>
                                <option value="1">1 Room</option>
                                <option value="2">2 Rooms</option>
                                <option value="3">3 Rooms</option>
                            </select>
                        </li>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-adults"
                                value={hotelsNumAdults}
                                className="card--holder-bar-extra-text"
                                onChange={(evt) => {
                                    setHotelsNumAdults(evt.target.value);
                                }}>
                                <option value="1">1 Adult</option>
                                <option value="2">2 Adults</option>
                                <option value="3">3 Adults</option>
                                <option value="4">4 Adults</option>
                            </select>
                        </li>
                        <li className="card--holder-extra-text">
                            <select
                                name="num-children"
                                value={hotelsNumKids}
                                className="card--holder-bar-extra-text"
                                onChange={(evt) => {
                                    setHotelsNumKids(evt.target.value);
                                }}>
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
        setEventCards(<></>);
        switch (selectedMode) {
            case "Flights":
                console.log(
                    flightsHome +
                        " | " +
                        flightsDate +
                        " | " +
                        flightsDest +
                        " | " +
                        flightsNumTravelers
                );

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
                console.log(
                    carHome +
                        " | " +
                        carDate +
                        " | " +
                        carDest +
                        " | " +
                        carNumTravelers
                );

                axiosInstance
                    .get("/transportation/api/v1/short")
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                break;
            case "Food":
                console.log(
                    foodName + " | " + foodRestrictions + " | " + foodCategories
                );

                axiosInstance
                    .get("/v1/dining/api", {
                        params: {
                            Address: foodLocation,
                            Radius: 1500,
                            Keyword:
                                foodName +
                                " " +
                                foodRestrictions +
                                " " +
                                foodCategories,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        setEventCards(
                            <>
                                {res.data.Results.map((e, i) => {
                                    return (
                                        <FoodCard
                                            key={i}
                                            name={e.name}
                                            image={e.photos[0].photo_reference}
                                            location={e.hotel_address}
                                            addCardFunction={eventHandler}
                                        />
                                    );
                                })}
                            </>
                        );
                    })
                    .catch((err) => console.log(err));
                break;
            case "Hotels":
                axiosInstance
                    .get("/api/v1/accommodations", {
                        params: {
                            location: hotelsLocation,
                            no_of_adults: hotelsNumAdults,
                            no_of_children: hotelsNumKids,
                            no_of_rooms: hotelsNumRooms,
                            check_in: hotelsTimeIn.toISOString().slice(0, 10),
                            checkout: hotelsTimeOut.toISOString().slice(0, 10),
                            currency: "CAD",
                        },
                    })
                    .then((res) => {
                        setEventCards(
                            <>
                                {res.data.hotel_information.map((e, i) => {
                                    return (
                                        <HotelsCard
                                            key={i}
                                            name={e.hotel_name}
                                            image={e.hotel_image}
                                            price={
                                                "$" + Math.round(e.hotel_price)
                                            }
                                            link={e.hotel_url}
                                            address={e.hotel_address}
                                            addCardFunction={eventHandler}
                                        />
                                    );
                                })}
                            </>
                        );
                    })
                    .catch((err) => console.log(err));
                break;
            case "Attraction":
                axiosInstance
                    .get("/api/v1/pois", {
                        params: {
                            Address: attractionLocation,
                            Radius: 1500,
                            Keyword: attractionKeywords,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        setEventCards(
                            <>
                                {res.data.Results.map((e, i) => {
                                    return (
                                        <AttractionCard
                                            key={i}
                                            name={e.name}
                                            image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${e.photos[0].photo_reference}&key=${process.env.FRONTEND_MAPS_API}`}
                                            link={e.link}
                                            address={e.hotel_address}
                                            addCardFunction={eventHandler}
                                        />
                                    );
                                })}
                            </>
                        );
                    })
                    .catch((err) => console.log(err));
                break;
            default:
                break;
        }
    }

    // Update cards whenever a query value gets changed
    useEffect(() => {
        getCardsFromAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedMode,
        flightsHome,
        flightsDate,
        flightsDest,
        flightsNumTravelers,
        carHome,
        carDate,
        carDest,
        carNumTravelers,
        foodName,
        foodRestrictions,
        foodCategories,
        hotelsLocation,
        hotelsTimeIn,
        hotelsTimeOut,
        hotelsNumRooms,
        hotelsNumAdults,
        hotelsNumKids,
        attractionKeywords,
        attractionLocation,
    ]);

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
                        <FlightCard
                            airline={"Air Canada"}
                            airlineLogo={Chevron}
                            flightCode={"AC 513"}
                            times={["8:00 AM", "2:00 PM"]}
                            timeZones={[
                                "Mountain Standard Time",
                                "Central European Standard Time",
                            ]}
                            price={"$831"}
                            currencyType={"CAD"}
                            duration={"12 hr 56 mins"}
                            addCardFunction={eventHandler}
                        />
                        <CarCard
                            type="driving"
                            duration="10 Minutes"
                            distance="11.2 KM"
                            link="a"
                            addCardFunction={eventHandler}
                        />
                        {eventCards}
                    </ul>
                </div>
            )}
        </>
    );
}
