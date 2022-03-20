package seng.xplored.tplanner;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RESTManager {

    // @RequestMapping(value = "/ex/foos", method = RequestMethod.GET)
    // @ResponseBody
    // public String getFoosBySimplePath() {
    //     return "Get some Foos";
    // }   
    @RequestMapping("/planner/api/v1/hello")
    public String getGreeting(){
       return "This is a new idea";
   } 
}