import { extractQuerystring } from "@firebase/util";
import React from "react";
import "./EventCard.scss";
import ChevronSmall from "../assets/chevron-small.svg";

interface AttractionCardProps {
    image?: string;
    name?: string;
    address?: string;
    link?: string;
}

export default function AttractionCard(props: AttractionCardProps) {
    return (
        <div className="card--entry card--attraction">
            <img
                src={props.image}
                className="card--attraction-image"
                alt="point of interest view"
            />
            <div className="card--attraction-text">
                <h1 className="card--attraction-label">{props.name}</h1>
                <p className="card--attraction-location">{props.address}</p>
            </div>
            <a href={props.link} className="card--attraction-link">
                {/* TODO: make this link to directions? */}
                <p>Booking</p>
                <img src={ChevronSmall} alt="follow link"></img>
            </a>
        </div>
    );
}
