import Axios from "axios";
import React, { useState } from "react";
import PlannerSwitcher from "../components/PlannerSwitcher";
import TravelMap from "../components/TravelMap";
import TravelPlanner from "../components/TravelPlanner";

interface IState {
  view: string;
}

interface IProps {}
class Home extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      view: "planner",
    };

    this.changeView = this.changeView.bind(this);
  }

  changeView(view: string) {
    this.setState({ view: view });
  }

  render() {
    return (
      <div
        style={{
          height: `calc(100vh - 12.75rem)`,
          width: `100%`,
          margin: `auto`,
        }}
      >
        {this.state.view === "planner" ? <TravelPlanner mode="planner"/> : <TravelMap />}
        <PlannerSwitcher switchFunction={this.changeView} />
      </div>
    );
  }
}

export default Home;
