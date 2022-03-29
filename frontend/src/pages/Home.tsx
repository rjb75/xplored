import Axios from "axios";
import React, { useState } from "react";
import PlannerSwitcher from "../components/PlannerSwitcher";
import TravelMap from "../components/TravelMap";
import TravelPlanner from "../components/TravelPlanner";
import NavBar from "../components/NavBar";

interface IState {
  view: string;
  mode: string;
  tripId: string;
}

interface IProps {}

/**
 * Describes the home page of the application.
 */
class Home extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      view: "planner",
      mode: "Flights",
      tripId: "",
    };

    this.changeTripId = this.changeTripId.bind(this);
    this.changeView = this.changeView.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  changeTripId(tripId: string) {
    this.setState({ tripId: tripId });
  }

  changeView(view: string) {
    this.setState({ view: view });
  }

  changeMode(aMode: string) {
    this.setState({ mode: aMode });
  }

  render() {
    return (
      <>
        <NavBar
          mode={this.state.mode}
          changeMode={this.changeMode}
          changeTripId={this.changeTripId}
        />
        <div
          style={{
            height: `calc(100vh - 12.75rem)`,
            width: `100%`,
            margin: `auto`,
          }}
        >
          {this.state.view === "planner" ? (
            <TravelPlanner mode={this.state.mode} tripId={this.state.tripId} />
          ) : (
            <TravelMap />
          )}
          <PlannerSwitcher switchFunction={this.changeView} />
        </div>
      </>
    );
  }
}

export default Home;
