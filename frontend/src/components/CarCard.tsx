import React from "react";
import "./EventCard.scss";

interface CarCardProps {
    departureLocation?: string;
    arrivalLocation?: string;
    date?: string[];
    time?: string;
}

export default function CarCard(props: CarCardProps) {
    return (
        <div className="card--entry card--car">
            <h1>This is a car card</h1>
        </div>
    );
}
