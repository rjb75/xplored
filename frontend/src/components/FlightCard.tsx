import React from "react";
import "./EventCard.scss";
import { ItemTypes } from '../utils/PlannerConstants';
import { useDrag } from 'react-dnd';

export interface FlightCardProps {
    airline?: string;
    flightCode?: string;
    times?: string[];
    price?: string;
    locations?: string[];
    addCardFunction: Function;
}

export default function FlightCard(props: FlightCardProps) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.EVENT,
        item: {
            type: "flight",
            title: "Flight to TEST",
          },
          collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            item: monitor.getItem(),
          }),
      }))

    return (
        <div ref={drag} className="card--entry card--flight">
            {
                isDragging ? (
                    <h1>This is not a flight card</h1>

                ) 
                : 
                (
                    <h1>This is a flight card</h1>
                )
            }
        </div>
    );
}
