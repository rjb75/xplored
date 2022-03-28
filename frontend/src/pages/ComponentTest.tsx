import React from "react";
import { TravelPlanner } from "../components/TravelPlanner";
import TravelMap from "../components/TravelMap";
import NavBar from "../components/NavBar";
import React from "react";

function ComponentTest() {
  return (
    <div
      style={{
        height: `calc(100vh - 12.75rem)`,
        width: `100%`,
        margin: `auto`,
      }}
    >
      <NavBar />
      <TravelMap />
      <TravelPlanner />
    </div>
  );
}

export default ComponentTest;
