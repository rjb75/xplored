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

function isPlannerEvent(items: plannerEvent | FlightCardProps): boolean{
    console.log((items as plannerEvent).type)
    if((items as plannerEvent).type !== "flight"){
        return true;
    }
    return false;
}

export const PlannerCell = ({day, time, children, test, dropCallbackMove, dropCallbackNewEvent}: AppProps) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.EVENT,
        drop: (item: plannerEvent | FlightCardProps, monitor) => {
            if(isPlannerEvent(item)){
                console.log("event");
            }
            else{
                console.log("flight");
            }
           // dropCallbackMove(item, day, time);
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
