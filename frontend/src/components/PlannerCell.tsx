import React, { useState } from "react";
import { useDrop } from 'react-dnd';
import { displayTimeToDateObj, ItemTypes } from "../utils/PlannerConstants";
import EventCard, { eventTypes, plannerEvent } from "./EventCard";
import { FlightCardProps } from './FlightCard';

interface AppProps {
    day: number,
    time: String,
    children?: JSX.Element,
    dropCallbackMove: Function,
    dropCallbackNewSetDateEvent: Function,
    dropCallbackNewEvent: Function,
}

export const PlannerCell = ({day, time, children, dropCallbackMove, dropCallbackNewEvent, dropCallbackNewSetDateEvent}: AppProps) => {

    // Hook to detect plannerEvents dropped into cell then pass to the dropCallback.
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.EVENT,
        drop: (item: any, monitor) => {
            if(item.itemType === "event"){
                dropCallbackMove(item, day, time);
            }else if(item.itemType === "long"){
                dropCallbackNewSetDateEvent((item as plannerEvent).name, item.type, day, item.start_time, item.end_time);
            }else{
                dropCallbackNewEvent((item as plannerEvent).name, item.type, day, time);
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
