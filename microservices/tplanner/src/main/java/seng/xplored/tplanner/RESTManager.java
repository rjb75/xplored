package seng.xplored.tplanner;

// import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import seng.xplored.tplanner.Repositories.*;
import java.util.*;
import seng.xplored.tplanner.models.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.bson.json.*;
// import org.springframework.data.mongodb.util.json.*;

@RestController
public class RESTManager {
    private final String baseURL = "/planner/api/v1";


    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    //Post Event
    @PostMapping(baseURL + "/event")
    public ResponseEntity<Trip> addEvent(@RequestBody Event event, @RequestParam("tripid") String tripid){
        HttpHeaders responseHeaders = new HttpHeaders();

        Trip trip;
        try{
            trip = tripRepository.findById(tripid).get(); //Gets the User with Id
        }
        catch(Exception ex){
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }

        eventRepository.save(event); //save the event in the database

        String[] events= trip.getEvents(); //Gets users Trips
        List<String> stringEvents=new ArrayList<>(Arrays.asList(events));

        Event myEvent = eventRepository.findById(event.getEvent_id()).get(); 
        String newEventId = myEvent.getEvent_id();

        stringEvents.add(newEventId);

        String[] str = new String[stringEvents.size()];

        for (int i = 0; i < stringEvents.size(); i++) {
            str[i] = stringEvents.get(i);
        }

        trip.setEvents(str);
        tripRepository.save(trip);
        // if(tripRepository.findById(tripid).isEmpty()){
        //     return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        // }
        
        return ResponseEntity.ok().headers(responseHeaders).body(trip);
    }

    // //Get Events
    // @GetMapping(baseURL + "/events")
    // public List<Event> getEvents(){
    //     return eventRepository.findAll();
    // }
    //Get Events
    @GetMapping(baseURL + "/events")
    @ResponseBody
    public ResponseEntity<List<Event>> getEvents(){
        HttpHeaders responseHeaders = new HttpHeaders();
        if(eventRepository.findAll().isEmpty()){ //NEED TO TEST THIS STILL
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        else{
            return ResponseEntity.ok().headers(responseHeaders).body(eventRepository.findAll());
        }
    }

    //Get Event
    @GetMapping(baseURL + "/event")
    public ResponseEntity<Optional<Event>> getEvent(@RequestParam("eventid") String eventid){
        // return eventRepository.findById(eventid);
        HttpHeaders responseHeaders = new HttpHeaders();
        if(eventRepository.findById(eventid).isEmpty()){ //NEED TO TEST THIS STILL
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        else{
            return ResponseEntity.ok().headers(responseHeaders).body(eventRepository.findById(eventid));
        }
    }

    
    //Post User
    @PostMapping(baseURL + "/user")
    public String addTrip(@RequestBody Trip trip){
        tripRepository.save(trip);
        return "Added trip with id:" + trip.getTrip_id();
    }

    //Post Trip
    @PostMapping(baseURL + "/trip")
    public String addTrip(@RequestBody Trip trip, @RequestParam("userid") String userid){
        tripRepository.save(trip); //Add Trip
        User user =  userRepository.findById(userid).get(); //Gets the User with Id
        String[] trips= user.getTrips(); //Gets users Trips
        List<String> stringTrips=new ArrayList<>(Arrays.asList(trips));

        System.out.println(stringTrips);

        Trip myTrip = tripRepository.findById(trip.getTrip_id()).get(); 
        String newTripId = myTrip.getTrip_id();

        stringTrips.add(newTripId);

        String[] str = new String[stringTrips.size()];

        for (int i = 0; i < stringTrips.size(); i++) {
            str[i] = stringTrips.get(i);
        }

        user.setTrips(str);
        userRepository.save(user);
        return "Added trip with id:" + trip.getTrip_id();
    }

    //Get All Trips
    @GetMapping(baseURL + "/trips")
    public List<Trip> getTrips(){
        System.out.println(tripRepository.findAll());
        return tripRepository.findAll();
    }

    //Get Single Trip
    @GetMapping(baseURL + "/trip")
    public Optional<Trip> getTrip(@RequestParam String id){
        return tripRepository.findById(id);
    }

     
    // //Get user's trips
    @GetMapping(baseURL + "/usertrips")
    public List<Trip> getTrips(@RequestParam String authid){
        User user =  userRepository.findByAuthId(authid);
        String trips[] = user.getTrips();
        List<Trip> trip = new ArrayList<>();
        for(int i =0; i<trips.length; i++){
            System.out.println(tripRepository.findById(trips[i]).get());
            trip.add(tripRepository.findById(trips[i]).get());
        }
        return trip;
    }

    //Get All Events in a Trip
    @GetMapping(baseURL + "/alltrips")
    public List<Event> getAllEventsInTrip(@RequestParam String tripid){
        Trip trip =  tripRepository.findById(tripid).get();
        String events[] = trip.getEvents();
        List<Event> event = new ArrayList<>();
        for(int i =0; i<events.length; i++){
            event.add(eventRepository.findById(events[i]).get());
        }
        return event;        
    }

    //Edit an Event
    @PostMapping(baseURL + "/editevent")
    public Event editEvent(@RequestParam String eventid, @RequestBody Event myEvent){
        Event event = eventRepository.findById(eventid).get();

        event.setEvent_id(eventid);
        event.setPhoto_URL(myEvent.getPhoto_URL());
        event.setType(myEvent.getType());
        event.setStart_time(myEvent.getStart_time());
        event.setEnd_time(myEvent.getEnd_time());
        event.setName(myEvent.getName());
        event.setAddress(myEvent.getAddress());
        event.setLink(myEvent.getLink());
        event.setEnd_time(myEvent.getEnd_time());
        event.setData(myEvent.getData());

        return eventRepository.save(event);
    }

    //Delete an event
    @DeleteMapping(baseURL + "/event")
    public String deleteEvent(@RequestParam("eventid") String eventid){
        eventRepository.deleteById(eventid);
        return "Deleted event with id:" + eventid;
    }
    
    //Delete a trip
    @DeleteMapping(baseURL + "/trip")
    public String deleteTrip(@RequestParam String tripid){
        Trip trip =  tripRepository.findById(tripid).get();

        String events[] = trip.getEvents();

        if(events.length != 0){
            for(int i = 0; i < events.length; i++){ //get all events for the trip, delete the events
                eventRepository.deleteById(events[i]);
            }
        }

        tripRepository.deleteById(tripid); //delete the trip
        return "Deleted trip with id:" + tripid;
    }

}