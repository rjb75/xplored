import { extractQuerystring } from "@firebase/util";
import React from "react";
import "./EventCard.scss";
import ChevronSmall from "../assets/chevron-small.svg";

interface HotelsCardProps {
    price?: string;
    image?: string;
    name?: string;
    link?: string;
    address?: string;
}

export default function HotelsCard(props: HotelsCardProps) {
    return (
        <div className="card--entry card--hotels">
            <img
                src={props.image}
                className="card--hotels-image"
                alt="hotel view"
            />
            <div className="card--hotels-text">
                <h1 className="card--hotels-label">{props.name}</h1>
                <p className="card--hotels-location">{props.address}</p>
                <a href={props.link} className="card--hotels-info">
                    View Website
                </a>
            </div>
            <div className="card--hotels-price-container">
                <h1 className="card--hotels-price">{props.price}</h1>
                <h2 className="card--hotels-price-night">night</h2>
            </div>
            <a href="#" className="card--hotels-link">
                {/* TODO: make this link to directions? */}
                <p>Directions</p>
                <img src={ChevronSmall} alt="follow link"></img>
            </a>
        </div>
    );
}
