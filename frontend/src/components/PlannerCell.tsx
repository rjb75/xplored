import React, { useState } from "react";
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../utils/PlannerConstants";
import EventCard, { eventTypes, plannerEvent } from "./EventCard";
import { FlightCardProps } from './FlightCard';

interface AppProps {
    day: String,
    time: String,
    children?: JSX.Element,
    dropCallbackMove: Function,
    dropCallbackNewEvent: Function,
    test?: boolean,
}

export const PlannerCell = ({day, time, children, test, dropCallbackMove, dropCallbackNewEvent}: AppProps) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.EVENT,
        drop: (item: plannerEvent | FlightCardProps, monitor) => {
            if((item as plannerEvent).type === "event"){
                dropCallbackMove(item, day, time);
            }else{
                dropCallbackNewEvent((item as plannerEvent).title, day, time);
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [day, time])

    return(
        <div ref={drop} className="cell">{children}</div>
    );
}

export default PlannerCell;
