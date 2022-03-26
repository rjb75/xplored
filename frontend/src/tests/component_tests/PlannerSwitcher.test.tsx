import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import PlannerSwitcher from "../../components/PlannerSwitcher";

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

it("switches state to planner", async () => {
  const testSwitchingFunction = jest.fn();

  // eslint-disable-next-line
  act(() => {
    render(<PlannerSwitcher switchFunction={testSwitchingFunction} />);
  });

  const topButton = await screen.findByTestId("plannerSwitcherTopElement");

  fireEvent.click(topButton);

  expect(testSwitchingFunction).toHaveBeenCalledWith("planner");
});

it("switches state to map", async () => {
  const testSwitchingFunction = jest.fn();

  // eslint-disable-next-line
  act(() => {
    render(<PlannerSwitcher switchFunction={testSwitchingFunction} />);
  });

  const bottomButton = await screen.findByTestId(
    "plannerSwitcherBottomElement"
  );

  fireEvent.click(bottomButton);

  expect(testSwitchingFunction).toHaveBeenCalledWith("map");
});

it("Top icon shows correct color on switch active", async () => {
  const testSwitchingFunction = jest.fn();

  // eslint-disable-next-line
  act(() => {
    render(<PlannerSwitcher switchFunction={testSwitchingFunction} />);
  });

  const TopButton = await screen.findByTestId("plannerSwitcherTopElement");
  fireEvent.click(TopButton);

  const icon = await screen.findByTestId("plannerSwitcherTopIcon");
  expect(icon).toHaveAttribute("fill", "white");
});

it("Top icon shows correct color on switch inactive", async () => {
  const testSwitchingFunction = jest.fn();

  // eslint-disable-next-line
  act(() => {
    render(<PlannerSwitcher switchFunction={testSwitchingFunction} />);
  });

  const bottomButton = await screen.findByTestId(
    "plannerSwitcherBottomElement"
  );
  fireEvent.click(bottomButton);

  const icon = await screen.findByTestId("plannerSwitcherTopIcon");
  expect(icon).toHaveAttribute("fill", "#453F3F");
});

it("Bottom icon shows correct color on switch active", async () => {
  const testSwitchingFunction = jest.fn();

  // eslint-disable-next-line
  act(() => {
    render(<PlannerSwitcher switchFunction={testSwitchingFunction} />);
  });

  const bottomButton = await screen.findByTestId(
    "plannerSwitcherBottomElement"
  );
  fireEvent.click(bottomButton);

  const icon = await screen.findByTestId("plannerSwitcherBottomIcon");
  expect(icon).toHaveAttribute("fill", "white");
});

it("Bottom icon shows correct color on switch inactive", async () => {
  const testSwitchingFunction = jest.fn();

  // eslint-disable-next-line
  act(() => {
    render(<PlannerSwitcher switchFunction={testSwitchingFunction} />);
  });

  const TopButton = await screen.findByTestId("plannerSwitcherTopElement");
  fireEvent.click(TopButton);

  const icon = await screen.findByTestId("plannerSwitcherBottomIcon");
  expect(icon).toHaveAttribute("fill", "#453F3F");
});
