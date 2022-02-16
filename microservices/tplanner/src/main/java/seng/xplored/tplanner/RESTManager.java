package seng.xplored.tplanner;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RESTManager {
   
    @RequestMapping("/api/v1/mongo")
   public String getGreeting(){
       return "This is a new idea";
   } 
}
