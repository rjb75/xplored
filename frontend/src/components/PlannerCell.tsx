import React, { useState } from "react";
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../utils/PlannerConstants";
import EventCard, { eventTypes, plannerEvent } from "./EventCard";

type AppProps = {
    day: String,
    time: number,
    children?: JSX.Element,
    test?: boolean,
}

export const PlannerCell = ({day, time, children, test}: AppProps) => {
    const [event, setEvents] = useState<plannerEvent | undefined>();

    function moveEvent(item: plannerEvent){
        setEvents(item);
    }

    function removeEvent(item: plannerEvent){
        console.log(test)
    }

    function ifEvent(){
        if(event !== undefined || test){
            return(
                <EventCard id="1" type={event?.type || eventTypes.FOOD} title={event?.title || "Test"} time={event?.time || "6:30 pm"}  duration={event?.duration || "1 Hour"} date={event?.date || "0"} />
            );
        }
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.EVENT,
        drop: (item: plannerEvent) => moveEvent(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [day, time])

    return(
        <div ref={drop} className="cell">{children}</div>
    );
}

export default PlannerCell;
