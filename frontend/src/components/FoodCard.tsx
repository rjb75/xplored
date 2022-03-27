import { extractQuerystring } from "@firebase/util";
import React from "react";
import "./EventCard.scss";
import ChevronSmall from "../assets/chevron-small.svg";

interface FoodCardProps {
    price?: string;
    location?: string;
    name?: string;
    image?: string;
    rating?: string;
    extras?: string[];
    priceTier?: string;
    hours?: string;
}

export default function FoodCard(props: FoodCardProps) {
    return (
        <div className="card--entry card--food">
            <div className="card--food-container">
                <img
                    src={props.image}
                    className="card--food-image"
                    alt="restaurant-view"
                />
                <div className="card--food-text">
                    <h1 className="card--food-label">{props.name}</h1>
                    <p className="card--food-location">{props.location}</p>
                    <ul className="card--food-list">
                        {props.extras?.map((item, key) => (
                            <li className="card--food-list-item" key={key}>
                                <p>{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <h1 className="card--food-rating">{props.rating}</h1>
            </div>
            <a href="" className="card--food-link">
                {/* TODO: make this link to directions? */}
                <p>Directions</p>
                <img src={ChevronSmall} alt="follow link"></img>
            </a>
        </div>
    );
}
