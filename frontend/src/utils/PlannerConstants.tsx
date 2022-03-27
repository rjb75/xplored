import { eventTypes, plannerEvent } from "../components/EventCard";

export const ItemTypes = {
  EVENT: "event",
};

export const days: { name: String }[] = [
  {
    name: "Monday",
  },
  {
    name: "Tuesday",
  },
  {
    name: "Whensday",
  },
  {
    name: "Thursday",
  },
  {
    name: "Friday",
  },
  {
    name: "Saturday",
  },
  {
    name: "Sunday",
  },
];

export const timeRows: { time: String }[] = [
  {
    time: "6:00 am",
  },
  {
    time: "6:30 am",
  },
  {
    time: "7:00 am",
  },
  {
    time: "7:30 am",
  },
  {
    time: "8:00 am",
  },
  {
    time: "8:30 am",
  },
  {
    time: "9:00 am",
  },
  {
    time: "9:30 am",
  },
  {
    time: "10:00 am",
  },
  {
    time: "10:30 am",
  },
  {
    time: "11:00 am",
  },
  {
    time: "11:30 am",
  },
  {
    time: "12:00 pm",
  },
  {
    time: "12:30 pm",
  },
  {
    time: "1:00 pm",
  },
  {
    time: "1:30 pm",
  },
  {
    time: "2:00 pm",
  },
  {
    time: "2:30 pm",
  },
  {
    time: "3:00 pm",
  },
  {
    time: "3:30 pm",
  },
  {
    time: "4:00 pm",
  },
  {
    time: "4:30 pm",
  },
  {
    time: "5:00 pm",
  },
  {
    time: "5:30 pm",
  },
  {
    time: "6:00 pm",
  },
  {
    time: "6:30 pm",
  },
  {
    time: "7:00 pm",
  },
  {
    time: "7:30 pm",
  },
  {
    time: "8:00 pm",
  },
  {
    time: "8:30 pm",
  },
  {
    time: "9:00 pm",
  },
  {
    time: "9:30 pm",
  },
  {
    time: "10:00 pm",
  },
  {
    time: "10:30 pm",
  },
  {
    time: "11:00 pm",
  },
  {
    time: "11:30 pm",
  },
  {
    time: "12:00 am",
  },
  {
    time: "12:30 am",
  },
  {
    time: "1:00 am",
  },
  {
    time: "1:30 am",
  },
];

export function dateObjToDisplayTime(date: Date) {
  let hour = date.getUTCHours();
  let pm = "am";
  if (hour > 12) {
    hour -= 12;
    pm = "pm";
  } else if (hour === 0) hour = 12;

  let mins = date.getUTCMinutes();
  let minsString = mins.toString();
  if (mins < 10) minsString = "0" + mins;

  return hour.toString() + ":" + minsString + " " + pm;
}

export function displayTimeToDateObj(time: string, month: number, day: number, year: number){
  let hours = parseFloat(time.split(":")[0]);
  let mins = parseFloat(time.split(":")[1].split(" ")[0]);
  let pm = time.split(" ")[1];

  if(pm === "pm"){
    hours += 12;
  }else if(hours === 12){
    hours = 0;
  }

  let ret = new Date();
  ret.setUTCFullYear(year);
  ret.setUTCMonth(month);
  ret.setUTCDate(day);
  ret.setUTCHours(hours);
  ret.setUTCMinutes(mins);
  ret.setUTCSeconds(0);
  ret.setUTCMilliseconds(0);

  return ret;
}

export function dateToDayString(date: Date) {
  let dayString: string = "";
  switch (date.getDay()) {
    case 0:
      dayString = "Sunday";
      break;
    case 1:
      dayString = "Monday";
      break;
    case 2:
      dayString = "Tuesday";
      break;
    case 3:
      dayString = "Wednesday";
      break;
    case 4:
      dayString = "Thursday";
      break;
    case 5:
      dayString = "Friday";
      break;
    case 6:
      dayString = "Saturday";
      break;
    default:
      dayString = "";
      break;
  }
  return dayString;
}

export function dateToMonthString(date: Date) {
  let month: string = "";
  console.log(date.getUTCMonth())
  switch (date.getUTCMonth()) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sept";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      break;
  }
  return month;
}

export function eventAdapter(events: any[]): plannerEvent[] {
  let e: plannerEvent[] = [];
  events.forEach((event) => {
    let type: eventTypes;
    switch (event.type) {
      case "ACC":
        type = eventTypes.ACCOMODATION;
        break;
      case "POI":
        type = eventTypes.POI;
        break;
      case "TRIPS":
        type = eventTypes.CAR;
        break;
      case "TRIPL":
        type = eventTypes.FLIGHT;
        break;
      case "DIN":
        type = eventTypes.FOOD;
        break;
      default:
        type = eventTypes.POI;
        break;
    }

    e.push({
      event_id: event.event_id,
      type: type,
      start_time: new Date(event.start_time),
      end_time: new Date(event.end_time),
      name: event.name,
      address: event.address,
      link: event.link,
      data: event.data,
      photo_URL: event.photo_URL,
    });
  });

  return e;
}
