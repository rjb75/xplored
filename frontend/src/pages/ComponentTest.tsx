import React from "react";
import { Accommodation } from "../components/Accommodation.js";
import { Auth } from "../components/Auth.js";
import { Dining } from "../components/Dining.js";
import { PhotoGallery } from "../components/PhotoGallery.js";
import { POI } from "../components/POI.js";
import { Ratings } from "../components/Ratings.js";
import { Recommendations } from "../components/Recommendations.js";
import { Transportation } from "../components/Transportation.js";
import { TravelPlanner } from "../components/TravelPlanner.js";

function ComponentTest() {
    return (
        <div>
            <Accommodation />
            <Auth />
            <Dining />
            <PhotoGallery />
            <POI />
            <Ratings />
            <Recommendations />
            <Transportation />
            <TravelPlanner />
        </div>
    );
}

export default ComponentTest;
