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
    //Get All Events
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

    //Get Single Event
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
    public ResponseEntity<User> addUser(@RequestBody User user){
        HttpHeaders responseHeaders = new HttpHeaders();
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user);
    }

    //Post Trip
    @PostMapping(baseURL + "/trip")
    public ResponseEntity<Object> addTrip(@RequestBody Trip trip, @RequestParam("userid") String userid){
        HttpHeaders responseHeaders = new HttpHeaders();
        User user;
        try{
            user = userRepository.findById(userid).get(); //Gets the User with Id
        } catch(Exception ex){
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }

        tripRepository.save(trip); //Add Trip
        String[] trips= user.getTrips(); //Gets users Trips
        List<String> stringTrips=new ArrayList<>(Arrays.asList(trips));

        // System.out.println(stringTrips);

        Trip myTrip = tripRepository.findById(trip.getTrip_id()).get(); 
        String newTripId = myTrip.getTrip_id();

        stringTrips.add(newTripId);

        String[] str = new String[stringTrips.size()];

        for (int i = 0; i < stringTrips.size(); i++) {
            str[i] = stringTrips.get(i);
        }

        user.setTrips(str);
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user);
    }

    //Get All Trips
    @GetMapping(baseURL + "/trips")
    public ResponseEntity<List<Trip>> getTrips(){
        // System.out.println(tripRepository.findAll());
        // return tripRepository.findAll();
        HttpHeaders responseHeaders = new HttpHeaders();
        if(tripRepository.findAll().isEmpty()){ //NEED TO TEST THIS STILL
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        else{
            return ResponseEntity.ok().headers(responseHeaders).body(tripRepository.findAll());
        }
    }

    //Get Single Trip
    @GetMapping(baseURL + "/trip")
    public ResponseEntity<Optional<Trip>> getTrip(@RequestParam String id){
        HttpHeaders responseHeaders = new HttpHeaders();
        if(tripRepository.findById(id).isEmpty()){ //NEED TO TEST THIS STILL
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        else{
            return ResponseEntity.ok().headers(responseHeaders).body(tripRepository.findById(id));
        }
    }

     
   //Get user's trips
    @GetMapping(baseURL + "/usertrips")
    public ResponseEntity<List<Trip>> getTrips(@RequestParam String authid){
        HttpHeaders responseHeaders = new HttpHeaders();
        User user =  userRepository.findByAuthId(authid);
        String trips[];
        try{ 
            trips = user.getTrips();
        } catch(Exception ex){
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        List<Trip> trip = new ArrayList<>();
        for(int i =0; i<trips.length; i++){
            // System.out.println(tripRepository.findById(trips[i]).get());
            trip.add(tripRepository.findById(trips[i]).get());
        }
        if(trip == null){ //NEED TO TEST THIS STILL
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        else{
            return ResponseEntity.ok().headers(responseHeaders).body(trip);
        }
    }

    //Get All Events in a Trip
    @GetMapping(baseURL + "/alltrips")
    public ResponseEntity<List<Event>> getAllEventsInTrip(@RequestParam String tripid){
        HttpHeaders responseHeaders = new HttpHeaders();
        Trip trip;
        try{ 
            trip =  tripRepository.findById(tripid).get();
        } catch(Exception ex){
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        String events[] = trip.getEvents();
        List<Event> event = new ArrayList<>();
        for(int i =0; i<events.length; i++){
            event.add(eventRepository.findById(events[i]).get());
        }
        if(event == null){  //NEED TO TEST THIS STILL
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        else{
            return ResponseEntity.ok().headers(responseHeaders).body(event);
        }      
    }

    //Edit an Event
    @PostMapping(baseURL + "/editevent")
    public ResponseEntity<Object> editEvent(@RequestParam String eventid, @RequestBody Event myEvent){
        HttpHeaders responseHeaders = new HttpHeaders();
        Event event;
        try{ 
            event = eventRepository.findById(eventid).get();
        } catch(Exception ex){
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }

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

        eventRepository.save(event);

        if(eventRepository.findById(eventid).isEmpty()){ //NEED TO TEST THIS STILL
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }
        else{
            return ResponseEntity.ok().headers(responseHeaders).body(eventRepository.findById(eventid));
        }
    }

    //Delete an event
    @DeleteMapping(baseURL + "/event")
    public ResponseEntity<Object> deleteEvent(@RequestParam("eventid") String eventid){
        HttpHeaders responseHeaders = new HttpHeaders();
        eventRepository.deleteById(eventid);
        if(eventRepository.findById(eventid).isEmpty()){ //NEED TO TEST THIS STILL
            return ResponseEntity.ok().headers(responseHeaders).body(null); //create a body for success!
        }
        else{
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body for failure
        }
    }
    
    //Delete a trip
    @DeleteMapping(baseURL + "/trip")
    public ResponseEntity<Object> deleteTrip(@RequestParam String tripid){
        HttpHeaders responseHeaders = new HttpHeaders();
        Trip trip;
        // System.out.println(tripid);
        try{
            trip =  tripRepository.findById(tripid).get();
        } catch(Exception ex){
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body!
        }

        String events[] = trip.getEvents();

        if(events.length != 0){
            for(int i = 0; i < events.length; i++){ //get all events for the trip, delete the events
                eventRepository.deleteById(events[i]);
            }
        }

        tripRepository.deleteById(tripid); //delete the trip
        if(tripRepository.findById(tripid).isEmpty()){ //NEED TO TEST THIS STILL
            return ResponseEntity.ok().headers(responseHeaders).body(null); //create a body for success!
        }
        else{
            return ResponseEntity.internalServerError().headers(responseHeaders).body(null); //create a body for failure
        }
    }

}