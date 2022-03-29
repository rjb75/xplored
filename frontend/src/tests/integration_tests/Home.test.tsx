import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import Home from "../../pages/Home";
import MockedMap from "../../components/TravelMap";
import MockedNav from "../../components/NavBar";
import MockedPlanner from "../../components/TravelPlanner";

jest.mock("../../components/TravelPlanner", () => {
  return function DummyTravelPlanner(props: any){
    return <div data-testid="TravelPlanner"></div>
  }
})

jest.mock("../../components/NavBar", () =>  {
  return function DummyNavBar(props: any){
    return <div data-testid="NavBar"></div>
  }
})

jest.mock("../../components/TravelMap", () => {
  return function DummyMap(props: any) {
    return <div data-testid="TravelMap"></div>;
  };
});

let container: any = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it.each`
  View         | Result             | Button
  ${"planner"} | ${"TravelPlanner"} | ${"plannerSwitcherTopElement"}
  ${"map"}     | ${"TravelMap"}     | ${"plannerSwitcherBottomElement"}
`("ChangeView correctly changes the view", async ({View, Result, Button}) => {
  // eslint-disable-next-line
  act(() => {
    render(<Home />);
  });

  const button = await screen.findByTestId(Button);

  fireEvent.click(button);

  expect(await screen.findByTestId(Result)).toBeVisible();
});
