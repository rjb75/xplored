import { plannerEvent, eventTypes } from "../components/EventCard";

export function eventAdapter(events: any[]): plannerEvent[]{
    let convertedEvents: plannerEvent[] = [];
    events.forEach((event) => {
      let type: eventTypes;
      switch (event.type) {
        case "ACC":
          type = eventTypes.ACCOMODATION
          break;
        case "TRIPS":
          type = eventTypes.CAR
          break;
        case "TRIPL":
          type = eventTypes.FLIGHT
          break;
        case "POI":
          type = eventTypes.POI
          break;
        case "DIN":
          type = eventTypes.FOOD
          break;
        default:
          type = eventTypes.ACCOMODATION
          break;
      }
      
      let startDate = new Date(event.start_time);
      let endDate = new Date(event.end_time);
      let difference = endDate.getTime() - startDate.getTime();
      difference = (difference/60)/60;
      
      let pm: string = "am";
      let hours = startDate.getHours();
      if(hours > 12){
          hours = hours - 12;
          pm = "pm";
      }else if(hours === 0){
          hours = 12;
      }

      let minsString: string = "";
      let mins = startDate.getMinutes();
      if(mins < 10){
          minsString = "0" + mins.toString();
      }else{
          minsString = mins.toString();
      }
  
      let e: plannerEvent = {
        id: event.event_id,
        type: type,
        title: event.name,
        date: (startDate.getDay() + 1).toString(),
        time: hours.toString() + ":" + minsString + " " + pm,
        duration: difference.toString() + " Hours",
      };

      convertedEvents.push(e);
  
    })
  
    return convertedEvents;
  }