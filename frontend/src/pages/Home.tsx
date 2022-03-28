import Axios from "axios";
import React, { useState } from "react";
import PlannerSwitcher from "../components/PlannerSwitcher";
import TravelMap from "../components/TravelMap";
import TravelPlanner from "../components/TravelPlanner";
import NavBar from "../components/NavBar";

interface IState {
    view: string;
    mode: string;
}

interface IProps {}
class Home extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            view: "planner",
            mode: "Flights",
        };

        this.changeView = this.changeView.bind(this);
        this.changeMode = this.changeMode.bind(this);
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
                <NavBar mode={this.state.mode} changeMode={this.changeMode} />
                <div
                    style={{
                        height: `calc(100vh - 12.75rem)`,
                        width: `100%`,
                        margin: `auto`,
                    }}>
                    {this.state.view === "planner" ? (
                        <TravelPlanner mode={this.state.mode} />
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
