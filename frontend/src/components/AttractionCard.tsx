import { extractQuerystring } from "@firebase/util";
import React from "react";
import "./EventCard.scss";
import { ItemTypes } from "../utils/PlannerConstants";
import { useDrag } from "react-dnd";
import ChevronSmall from "../assets/chevron-small.svg";
import { eventTypes } from "./EventCard";

interface AttractionCardProps {
    image?: string;
    name?: string;
    address?: string;
    link?: string;
    addCardFunction: Function;
}

export default function AttractionCard(props: AttractionCardProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.EVENT,
        item: {
            event_id: null,
            type: eventTypes.POI,
            start_time: null,
            end_time: null,
            name: "Visit to " + props.name,
            address: null,
            link: null,
            data: null,
            photo_url: null,
            itemType: null,
            duratation: null,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            item: monitor.getItem(),
        }),
    }));

    return (
        <div ref={drag} className="card--entry card--attraction">
            <img
                src={props.image}
                className="card--attraction-image"
                alt="point of interest view"
            />
            {/* {props.image && (
                <div
                    className="card--attraction-image"
                    dangerouslySetInnerHTML={{ __html: props.image }}
                />
            )} */}
            <div className="card--attraction-text">
                <h1 className="card--attraction-label">{props.name}</h1>
                <p className="card--attraction-location">{props.address}</p>
            </div>
            {props.link && (
                <a href={props.link} className="card--attraction-link">
                    {/* TODO: make this link to directions? */}
                    <p>Booking</p>
                    <img src={ChevronSmall} alt="follow link"></img>
                </a>
            )}
        </div>
    );
}
