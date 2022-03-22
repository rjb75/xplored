package seng.xplored.tplanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import seng.xplored.tplanner.Repositories.*;
import java.util.*;
import seng.xplored.tplanner.models.*;

@RestController
public class RESTManager {

    private final String baseURL = "/planner/api/v1";

    @Autowired
    private EventRepository eventRepository;

    // @RequestMapping(value = "/ex/foos", method = RequestMethod.GET)
    // @ResponseBody
    // public String getFoosBySimplePath() {
    //     return "Get some Foos";
    // }   

    private String endpoint(String url){
        return baseURL + url;
    }

    // Get Event
    @RequestMapping(baseURL + "/event")
    public String getEvent(){
       return "Get Event";
    } 

    @PostMapping("/event")
    public String addEvent(@RequestBody Event event){
        eventRepository.save(event);
        return "Added book with id:" + event.getEvent_id();
    }

    @GetMapping("/events")
    public List<Event> getEvents(){
        System.out.println("HEY");
        System.out.println(eventRepository.findAll());
        return eventRepository.findAll();
    }


    @GetMapping("/event/{id}")
    public Optional<Event> getEvent(@PathVariable String id){
        return eventRepository.findById(id);
    }

    // Create Event   

    //POST REQUEST

    // Delete Event

    // Get Trip

    // Create Trip

    // Delete Trip

}