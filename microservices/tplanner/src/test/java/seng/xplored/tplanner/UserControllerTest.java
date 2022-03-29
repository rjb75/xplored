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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

@AutoConfigureMockMvc
@AutoConfigureDataMongo
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserControllerTest {
 
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
        //Create First User
        String[] tripsOne = {"623bdb2996a983ea8e7168a9", "623fa6b5f8832461dcd44bca"};
        userRepository.save(new User("6237ac6b299bb1be6ea70ed8", "12j1iej31", tripsOne));

        //Create a
        String[] eventsOne = {};
        tripRepository.save(new Trip("623bdb2996a983ea8e7168a9", "Paris Trip", "Image Link",eventsOne ));

        tripRepository.save(new Trip("518asdasd32r8fjio10934ik", "Berlin Trip", "Image Link",eventsOne ));

        tripRepository.save(new Trip("901t3itifesmfodfjk8314fd", "Sydney Trip", "Image Link",eventsOne ));

        // //Create Second User
        // String[] tripsTwo = {};
        // userRepository.save(new User("623fd6980763831fac69fee0", "test123", tripsTwo));

        // //Create Third User
        // String[] tripsThree = {"62410f506d61765a335d95f8", "trip4"};
        // userRepository.save(new User("62410f2c6d61765a335d95f7", "RI8UnOawe7Md9Mw56GSSd8KYvB42", tripsThree));


  
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String makeUrl(String url){
        return "/planner/api/v1" + url;
    }
 
    // @Test
    // public void test_getById_successfull() throws Exception {
    //     mvc.perform(get("/").param("id", "1")).andExpect(status().isOk()).andExpect(content().string("{\"id\":1,\"firstName\":\"James\",\"lastName\":\"Bond\"}"));;
    //     mvc.perform(get("/").param("id", "2")).andExpect(status().isOk()).andExpect(content().string("{\"id\":2,\"firstName\":\"James\",\"lastName\":\"Farley\"}"));        ;
    //     mvc.perform(get("/").param("id", "3")).andExpect(status().isOk()).andExpect(content().string("{\"id\":3,\"firstName\":\"Marley\",\"lastName\":\"Hemp\"}"));
    //     mvc.perform(get("/").param("id", "4")).andExpect(status().isOk()).andExpect(content().string("{\"id\":4,\"firstName\":\"James\",\"lastName\":\"Bond\"}"));        ;
    // }

    /*
    * Testing getTrip with an id. Trip was created in the setup stage of testing. 
    */
    @Test
    public void getTrip_Success() throws Exception{
        String tripid = "623bdb2996a983ea8e7168a9";
        mvc.perform(get(makeUrl("/trip"))
        .param("id", tripid))
        .andExpect(status()
        .isOk())
        .andExpect(content()
        .string("{\"trip_id\":\"623bdb2996a983ea8e7168a9\",\"name\":\"Paris Trip\",\"photo_URL\":\"Image Link\",\"events\":[]}"));
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

    @Test
    public void getAllTrips_Success() throws Exception{
        mvc.perform( MockMvcRequestBuilders
      .get(makeUrl("/trips"))
      .accept(MediaType.APPLICATION_JSON))
      .andDo(MockMvcResultHandlers.print())
      .andExpect(status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$[*].trip_id").isNotEmpty());
    }



    // @Test
    // public void test_getByFirstName_successfull() throws Exception {
 
    //     mvc.perform(get("/").param("firstName", "James")).andExpect(status().isOk()).andExpect(content().string("[{\"id\":1,\"firstName\":\"James\",\"lastName\":\"Bond\"},{\"id\":2,\"firstName\":\"James\",\"lastName\":\"Farley\"},{\"id\":4,\"firstName\":\"James\",\"lastName\":\"Bond\"}]"));
 
    //     mvc.perform(get("/").param("firstName", "Marley")).andExpect(status().isOk()).andExpect(content().string("[{\"id\":3,\"firstName\":\"Marley\",\"lastName\":\"Hemp\"}]"));        ;
    // }
}