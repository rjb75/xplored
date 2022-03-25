import React from "react";
import "./EventCard.scss";

interface FlightCardProps {
    airline?: string;
    flightCode?: string;
    times?: string[];
    price?: string;
    locations?: string[];
}

export default function FlightCard(props: FlightCardProps) {
    return (
        <div className="card--entry card--flight">
            <h1>This is a flight card</h1>
        </div>
    );
}
