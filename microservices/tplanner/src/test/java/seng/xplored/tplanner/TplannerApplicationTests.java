package seng.xplored.tplanner;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import seng.xplored.tplanner.Repositories.*;
import seng.xplored.tplanner.models.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

@AutoConfigureMockMvc
@AutoConfigureDataMongo
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TplannerApplicationTests {
 
    @Autowired
    private MockMvc mvc;
 
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private EventRepository eventRepository;
    
 
    @BeforeAll
    public void setup(){
        
        //Create Events
        eventRepository.save(new Event("6237a5c8299bb1be6ea70ed3", Type.DIN, "2022-05-02T20:00:00Z", "2022-05-02T21:00:00Z", "McDonalds McLeod Trail", "9311 Macleod Trail SW, Calgary, AB T2J 0P6", "https://www.mcdonalds.com/ca/en-ca/restaurant-locator.html?y_source=1_MTQ1MTkzOTgtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D", "", "aaabbb111.ca"));
        eventRepository.save(new Event("6237aa07299bb1be6ea70ed4", Type.TRANSL, "2022-06-03T08:00:00Z", "2022-06-04T14:00:00Z", "Air Canada Flight to Rio De Janiero", "2000 Airport Rd NE, Calgary, AB T2E 6W5", "aircanada.ca", "Please arrive to your gate at a minimum of 1 hour before departure.", "aircanada.ca"));
        eventRepository.save(new Event("6237aae5299bb1be6ea70ed5", Type.ACC, "2022-09-02T11:00:00Z", "2022-08-12T21:00:00Z", "Sheraton Center Toronto Hotel", "123 Queen St W, Toronto, ON M5H 2M9", "https://www.marriott.com/en-us/hotels/yyztc-sheraton-centre-toronto-hotel/overview/?scid=bb1a189a-fec3-4d19-a255-54ba596febe2&y_source=1_MTcxNDk4NC03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D", "Check-in is at 2pm and checkout is at 11a.m", "xyz.com"));
       
        //Setup event arrays for Trip Creation
        String[] eventsOne = {
            "6237a5c8299bb1be6ea70ed3",
            "6237aa07299bb1be6ea70ed4",
        };

        String [] eventsTwo = {
            "6237aae5299bb1be6ea70ed5" 
        };

        String [] eventsThree = {};

        //Create Trips
        tripRepository.save(new Trip("623bdb2996a983ea8e7168a9", "Paris Trip", "Image Link",eventsOne ));
        tripRepository.save(new Trip("518asdasd32r8fjio10934ik", "Berlin Trip", "Image Link", eventsTwo ));
        tripRepository.save(new Trip("901t3itifesmfodfjk8314fd", "Sydney Trip", "Image Link",eventsThree ));

        //Setup trips array for User Creation
        String[] tripsOne = {"901t3itifesmfodfjk8314fd", "518asdasd32r8fjio10934ik"};

        //Create User
        userRepository.save(new User("6237ac6b299bb1be6ea70ed8", "12j1iej31", tripsOne));
    }

    //Helper Function to convert object to Json
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Create URL For Planner API
    public String makeUrl(String url){
        return "/planner/api/v1" + url;
    }
 
    /*
    * Testing getTrip with an id. Trip was created in the setup stage of testing. 
    */
    @Test
    public void getTrip_Success() throws Exception{
        String expectedTripId = "623bdb2996a983ea8e7168a9";
        String expectedName = "Paris Trip";

        mvc.perform( MockMvcRequestBuilders
        .get(makeUrl("/trip"))
        .param("id", expectedTripId)
        .accept(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.trip_id").value(expectedTripId))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(expectedName));
    }

     /*
    * Testing post request with trip with no events on pre-created user. 
    */
    @Test
    public void addTrip_Success() throws Exception {
        String authid ="12j1iej31";
        String[] eventsOne = {};
        mvc.perform( MockMvcRequestBuilders
        .post(makeUrl("/trip"))
        .param("authid", authid)
        .content(asJsonString(new Trip(authid, "Malta Trip", "photo Url", eventsOne)))
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    /*
    * All trips in mock database is retrieved.  
    */
    @Test
    public void getAllTrips_Success() throws Exception{
        mvc.perform( MockMvcRequestBuilders
      .get(makeUrl("/trips"))
      .accept(MediaType.APPLICATION_JSON))
      .andDo(MockMvcResultHandlers.print())
      .andExpect(status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$[*].trip_id").isNotEmpty());
    }

    
    /*
    * Testing getEvent with an id. Event was created in the setup stage of testing. 
    */
    @Test
    public void getEvent_Success() throws Exception{
        String expectedEventid = "6237aae5299bb1be6ea70ed5";
        String expectedName = "Sheraton Center Toronto Hotel";

        mvc.perform( MockMvcRequestBuilders
        .get(makeUrl("/event"))
        .param("eventid", expectedEventid)
        .accept(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.event_id").value(expectedEventid))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(expectedName));

    }

    /*
    * All trips in mock database is retrieved.  
    */
    @Test
    public void getAllEvents_Success() throws Exception{
        mvc.perform( MockMvcRequestBuilders
      .get(makeUrl("/events"))
      .accept(MediaType.APPLICATION_JSON))
      .andDo(MockMvcResultHandlers.print())
      .andExpect(status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$[*].event_id").isNotEmpty());
    }

    /*
    * Testing post request with event on pre-created trip.
    */
    @Test
    public void addEvent_Success() throws Exception {
        String tripid ="623bdb2996a983ea8e7168a9";
        mvc.perform( MockMvcRequestBuilders
        .post(makeUrl("/event"))
        .param("tripid", tripid)
        .content(asJsonString(new Event("624110d96d61765a335d95f9", Type.POI, "2022-04-03T18:30:00.000Z", "2022-04-03T19:30:00.000Z", "Rock Climbing at the Calgary Climbing Center", "9311 Macleod Trail SW, Calgary, AB T2J 0P6", "https://www.mcdonalds.com/ca/en-ca/restaurant-locator.html?y_source=1_MTQ1MTkzOTgtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D", "", "")))
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.trip_id").value(tripid));
    }

     /*
    * Editing a pre-existing event.
    */
    @Test
    public void editEvent_Success() throws Exception {
        String eventid ="6237a5c8299bb1be6ea70ed3";
        mvc.perform( MockMvcRequestBuilders
        .post(makeUrl("/editevent"))
        .param("eventid", eventid)
        .content(asJsonString(new Event("6237a5c8299bb1be6ea70ed3", Type.POI, "2022-04-03T18:30:00.000Z", "2022-04-03T19:30:00.000Z", "Rock Climbing at the Calgary Climbing Center", "9311 Macleod Trail SW, Calgary, AB T2J 0P6", "https://www.mcdonalds.com/ca/en-ca/restaurant-locator.html?y_source=1_MTQ1MTkzOTgtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D", "", "")))
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.event_id").value(eventid));
    }

    /*
    * Deleting a pre-existing event from mock database. Verifying success status.
    */
    @Test
    public void deleteEvent_Success() throws Exception {
        String eventid = "6237aae5299bb1be6ea70ed5";
        String tripid = "518asdasd32r8fjio10934ik";
        mvc.perform( MockMvcRequestBuilders.
        delete(makeUrl("/event"))
        .param("eventid", eventid)
        .param("tripid", tripid))
        .andExpect(status().isOk());
    }

    /*
    * Testing post request with user with user auth id with no events on user. Also verifies id generation
    */
    @Test
    public void addUser_Success() throws Exception {
        String authid ="1590ifjad21";
        String[] trips = {};
        mvc.perform( MockMvcRequestBuilders
        .post(makeUrl("/user"))
        .param("authid", authid)
        .content(asJsonString(new User(null, authid, trips)))
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }
    
    /*
    * All trips in mock database is retrieved.  
    */
    @Test
    public void getAllUserTrips_Success() throws Exception{
        String authid = "12j1iej31";

        mvc.perform( MockMvcRequestBuilders
        .get(makeUrl("/usertrips"))
        .param("authid", authid)
        .accept(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$[*].trip_id").isNotEmpty());
    }

    /*
    * Get All events in a trip
    */
    @Test
    public void getAllEventsInTrip_Success() throws Exception{
        String tripid = "623bdb2996a983ea8e7168a9";

        mvc.perform( MockMvcRequestBuilders
        .get(makeUrl("/alltrips"))
        .param("tripid", tripid)
        .accept(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$[*].event_id").isNotEmpty())
        .andExpect(MockMvcResultMatchers.jsonPath("$[*].name").isNotEmpty());
    }

    /*
    * Failed Trip due to no AuthId in table
    */
    @Test
    public void getAllUserTrips_InvalidAuthId() throws Exception{
        String authid = "21390ifsdda"; //Does not exist

        mvc.perform( MockMvcRequestBuilders
        .get(makeUrl("/usertrips"))
        .param("authid", authid)
        .accept(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(status().isInternalServerError());
    }

    /*
    * Get All events in a trip
    */
    @Test
    public void getAllEventsInTrip_InvalidTripId() throws Exception{
        String tripid = "dokspf[spldp[fsd";

        mvc.perform( MockMvcRequestBuilders
        .get(makeUrl("/alltrips"))
        .param("tripid", tripid)
        .accept(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(status().isInternalServerError());
    }

     /*
    * Failed test with bad endpoint
    */
    @Test
    public void deleteEvent_NotFound() throws Exception {
        String eventid = "6237aae5299bb1be6ea70ed5";
        String tripid = "518asdasd32r8fjio10934ik";
        mvc.perform( MockMvcRequestBuilders.
        delete(makeUrl("/ksaopfaodp[wa"))
        .param("eventid", eventid)
        .param("tripid", tripid))
        .andExpect(status().isNotFound());
    }

     /*
    * Failed test with not found id
    */
    @Test
    public void deleteEvent_InvalidEventId() throws Exception {
        String eventid = "13940iospfdf.msdsdf";
        String tripid = "518asdasd32r8fjio10934ik";
        mvc.perform( MockMvcRequestBuilders.
        delete(makeUrl("/event"))
        .param("eventid", eventid)
        .param("tripid", tripid))
        .andExpect(status().isInternalServerError());
    }

     /*
    * Testing bad request 
    */
    @Test
    public void addTrip_BadRequest() throws Exception {
        String authid ="12j1iej31";
        String[] eventsOne = {};
        mvc.perform( MockMvcRequestBuilders
        .post(makeUrl("/trip"))
        .param("eventid", authid) //wrong param
        .content(asJsonString(new Trip(authid, "Malta Trip", "photo Url", eventsOne)))
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }
}