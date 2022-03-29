import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import EventCard from "../../components/EventCard";
import { eventTypes } from "../../components/EventCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { title } from "process";
import { dateObjToDisplayTime } from "../../utils/PlannerConstants";

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
  IconType    | Time                                                            | expectedDisplayTime | Title            | Duration
  ${"DIN"}    | ${"Sun Apr 03 2022 12:30:00 GMT-0600 (Mountain Daylight Time)"} | ${"6:30 pm"}        | ${"Test Title0"} | ${30}
  ${"TRANSS"} | ${"Sun Apr 03 2022 12:30:00 GMT-0600 (Mountain Daylight Time)"} | ${"6:30 pm"}        | ${"Test Title1"} | ${30}
  ${"TRANSL"} | ${"Sun Apr 03 2022 12:30:00 GMT-0600 (Mountain Daylight Time)"} | ${"6:30 pm"}        | ${"Test Title2"} | ${30}
  ${"ACC"}    | ${"Sun Apr 03 2022 12:30:00 GMT-0600 (Mountain Daylight Time)"} | ${"6:30 pm"}        | ${"Test Title3"} | ${30}
  ${"POI"}    | ${"Sun Apr 03 2022 12:30:00 GMT-0600 (Mountain Daylight Time)"} | ${"6:30 pm"}        | ${"Test Title4"} | ${30}
`(
  "Test correct card content",
  async ({ IconType, Time, expectedDisplayTime, Title, Duration }) => {
    // eslint-disable-next-line
    let start;
    let end;
    let expected = "";
    act(() => {
      start = new Date(Time);
      expected = dateObjToDisplayTime(start)
      end = start;
      end.setMinutes(start.getMinutes() + Duration);
      render(
        <DndProvider backend={HTML5Backend}>
          <EventCard
            event_id={"test"}
            type={IconType}
            start_time={start}
            end_time={end}
            name={title}
            address={"000"}
            link={""}
            data={""}
            photo_URL={""}
            editSizeCallBack={() => {}}
            deleteCallBack={() => {}}
          />
        </DndProvider>
      );
    });

    expect(await screen.findByAltText(IconType + "Icon")).toBeVisible();
  }
);
