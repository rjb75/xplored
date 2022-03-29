package seng.xplored.tplanner;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import seng.xplored.tplanner.Repositories.*;
import seng.xplored.tplanner.models.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

        String[] eventsOne = {};
        tripRepository.save(new Trip("623bdb2996a983ea8e7168a9", "Paris Trip", "Image Link",eventsOne ));

        // //Create First User
        // String[] tripsTwo = {};
        // userRepository.save(new User("623fd6980763831fac69fee0", "test123", tripsTwo));

        // //Create First User
        // String[] tripsThree = {"62410f506d61765a335d95f8", "trip4"};
        // userRepository.save(new User("62410f2c6d61765a335d95f7", "RI8UnOawe7Md9Mw56GSSd8KYvB42", tripsThree));


  
    }
 
    // @Test
    // public void test_getById_successfull() throws Exception {
    //     mvc.perform(get("/").param("id", "1")).andExpect(status().isOk()).andExpect(content().string("{\"id\":1,\"firstName\":\"James\",\"lastName\":\"Bond\"}"));;
    //     mvc.perform(get("/").param("id", "2")).andExpect(status().isOk()).andExpect(content().string("{\"id\":2,\"firstName\":\"James\",\"lastName\":\"Farley\"}"));        ;
    //     mvc.perform(get("/").param("id", "3")).andExpect(status().isOk()).andExpect(content().string("{\"id\":3,\"firstName\":\"Marley\",\"lastName\":\"Hemp\"}"));
    //     mvc.perform(get("/").param("id", "4")).andExpect(status().isOk()).andExpect(content().string("{\"id\":4,\"firstName\":\"James\",\"lastName\":\"Bond\"}"));        ;
    // }
    @Test
    public void tempo() throws Exception{
        String tripid = "623bdb2996a983ea8e7168a9";
        mvc.perform(get("/planner/api/v1/trip").param("id", tripid)).andExpect(status().isOk()).andExpect(content().string("{\"trip_id\":\"623bdb2996a983ea8e7168a9\",\"name\":\"Paris Trip\",\"photo_URL\":\"Image Link\",\"events\":[]}"));

    }
    // @Test
    // public void test_getByFirstName_successfull() throws Exception {
 
    //     mvc.perform(get("/").param("firstName", "James")).andExpect(status().isOk()).andExpect(content().string("[{\"id\":1,\"firstName\":\"James\",\"lastName\":\"Bond\"},{\"id\":2,\"firstName\":\"James\",\"lastName\":\"Farley\"},{\"id\":4,\"firstName\":\"James\",\"lastName\":\"Bond\"}]"));
 
    //     mvc.perform(get("/").param("firstName", "Marley")).andExpect(status().isOk()).andExpect(content().string("[{\"id\":3,\"firstName\":\"Marley\",\"lastName\":\"Hemp\"}]"));        ;
    // }
}