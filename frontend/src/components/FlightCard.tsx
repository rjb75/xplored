import React from "react";
import "./EventCard.scss";
import { ItemTypes } from "../utils/PlannerConstants";
import { useDrag } from "react-dnd";
import { eventTypes } from "./EventCard";

export interface FlightCardProps {
    airline?: string;
    airlineLogo?: string;
    flightCode?: string;
    times: string[];
    timeZones: string[];
    price?: string;
    locations?: string[];
    duration?: string;
    currencyType?: string;
    addCardFunction: Function;
}

export default function FlightCard(props: FlightCardProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.EVENT,
        item: {
            event_id: null,
            type: eventTypes.FLIGHT,
            start_time: props.times[0],
            end_time: props.times[1],
            name: "Flight to TBD",
            address: null,
            link: null,
            data: null,
            photo_url: null,
            itemType: "flight",
            duratation: null,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            item: monitor.getItem(),
        }),
    }));

    return (
        <div ref={drag} className="card--entry card--flight">
            <div className="card--flight-airline-container">
                <img
                    src={props.airlineLogo}
                    alt="airline logo"
                    className="card--flight-airline-logo"
                />
                <p className="card--flight-code">{props.flightCode}</p>
            </div>
            <div className="card--flight-time-container">
                <div className="card--flight-home">
                    <h2 className="card--flight-time">{props.times[0]}</h2>
                    <p className="card--flight-zone">{props.timeZones[0]}</p>
                </div>
                <h2 className="card--flight-time-center">-</h2>
                <div className="card--flight-dest">
                    <h2 className="card--flight-time">{props.times[1]}</h2>
                    <p className="card--flight-zone">{props.timeZones[1]}</p>
                </div>
            </div>
            <p className="card--flight-duration">{props.duration}</p>
            <div className="card--flight-price-container">
                <p className="card--flight-currency-type">
                    {props.currencyType}
                </p>
                <h1 className="card--flight-price">{props.price}</h1>
            </div>
        </div>
    );
}
