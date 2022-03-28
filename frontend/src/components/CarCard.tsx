import React from "react";
import "./EventCard.scss";
import { ItemTypes } from "../utils/PlannerConstants";
import { useDrag } from "react-dnd";
import CarIcon from "../assets/carIcon2.svg";
import BikeIcon from "../assets/bikeIcon.svg";
import ChevronSmall from "../assets/chevron-small.svg";

interface CarCardProps {
    type?: string;
    duration?: string;
    distance?: string;
    link?: string;
    addCardFunction: Function;
}

export default function CarCard(props: CarCardProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.EVENT,
        item: {
            type: "Car",
            title: "Car to TEST",
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            item: monitor.getItem(),
        }),
    }));

    let logo;
    let linkLabel;
    switch (props.type) {
        case "driving":
            logo = CarIcon;
            linkLabel = "Book Taxi";
            break;
        case "transit":
            logo = CarIcon;
            linkLabel = "Get Tickets";
            break;
        case "cycling":
            logo = BikeIcon;
            linkLabel = "Find Rentals";
            break;
        case "walking":
            logo = BikeIcon;
            break;
        default:
            break;
    }

    return (
        <div ref={drag} className="card--entry card--car">
            <img
                className="card--car-icon"
                src={logo}
                alt={props.type + " transportation"}
            />
            <div className="card--car-info-holder">
                <h1 className="card--car-duration">{props.duration}</h1>
                <h2 className="card--car-distance">{props.distance}</h2>
                {props.link && linkLabel && (
                    <a className="card--car-link" href={props.link}>
                        {linkLabel}
                    </a>
                )}
            </div>
            <a href="#" className="card--car-directions">
                <p>Directions</p>
                <img src={ChevronSmall} alt="view directions" />
            </a>
        </div>
    );
}
