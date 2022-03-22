import React, { useState } from "react";
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../utils/PlannerConstants";
import EventCard, { eventTypes, plannerEvent } from "./EventCard";

type AppProps = {
    day: String,
    time: String,
    children?: JSX.Element,
    dropCallback: Function,
    test?: boolean,
}

export const PlannerCell = ({day, time, children, test, dropCallback}: AppProps) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.EVENT,
        drop: (item: plannerEvent, monitor) => {
            console.log(monitor.getItem());
            dropCallback(item, day, time);
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
