import React, { useState } from "react";
import { TravelPlanner } from "../components/TravelPlanner";
import TravelMap from "../components/TravelMap";
import NavBar from "../components/NavBar";

function ComponentTest() {
    const [mode, changeMode] = useState("Flights");

    return (
        <div
            style={{
                height: `calc(100vh - 12.75rem)`,
                width: `100%`,
                margin: `auto`,
            }}>
            <NavBar mode={mode} changeMode={changeMode} />
            <TravelMap />
            <TravelPlanner mode={mode} />
        </div>
    );
}

export default ComponentTest;
