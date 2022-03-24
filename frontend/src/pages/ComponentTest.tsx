import React from "react";
import { Accommodation } from "../components/Accommodation";
import { Auth } from "../components/Auth";
import { Dining } from "../components/Dining";
import EventCard from "../components/EventCard";
import { PhotoGallery } from "../components/PhotoGallery";
import { POI } from "../components/POI";
import { Ratings } from "../components/Ratings";
import { Recommendations } from "../components/Recommendations";
import { Transportation } from "../components/Transportation";
import { TravelPlanner } from "../components/TravelPlanner";
import { eventTypes } from "../components/EventCard";
import EventCardHolder from "../components/EventCardHolder";

function ComponentTest() {
    return (
        <div style={{ height: `100vh`, width: `100%`, margin: `auto` }}>
            <TravelPlanner />
            <EventCardHolder selectedMode="Food" />
        </div>
    );
}

export default ComponentTest;
