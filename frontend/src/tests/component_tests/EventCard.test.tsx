import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import EventCard from "../../components/EventCard";
import { eventTypes } from "../../components/EventCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  IconType               | Time          | Title            | Duration
  ${"food"}          | ${"6:00 am"}  | ${"Test Title0"} | ${"0.5 Hour"}
  ${"car"}           | ${"12:00 pm"} | ${"Test Title1"} | ${"1 Hour"}
  ${"flight"}        | ${"12:00 am"} | ${"Test Title2"} | ${"2 Hour"}
  ${"accommodation"} | ${"8:00 pm"}  | ${"Test Title3"} | ${"2.5 Hour"}
  ${"poi"}           | ${"10:00 am"} | ${"Test Title4"} | ${"5 Hour"}
`("Test correct card content", async ({IconType, Time, Title, Duration}) => {
  // eslint-disable-next-line
  act(() => {
    render(
      <DndProvider backend={HTML5Backend}>
        <EventCard
          type={IconType}
          time={Time}
          title={Title}
          duration={Duration}
          date="1"
          id="test"
        />
      </DndProvider>
    );
  });

  expect(await screen.findByAltText(IconType+"Icon")).toBeVisible();
  expect(await screen.findByTestId("eventCardTime")).toHaveTextContent(Time);
  expect(await screen.findByTestId("eventCardTitle")).toHaveTextContent(Title);
  expect(await screen.findByTestId("eventCardDuration")).toHaveTextContent(Duration);
});
