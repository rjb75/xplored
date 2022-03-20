package seng.xplored.tplanner;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RESTManager {

    private final String baseURL = "/planner/api/v1";

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

    // Create Event   

    //POST REQUEST

    // Delete Event

    // Get Trip

    // Create Trip

    // Delete Trip

}