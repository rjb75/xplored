package seng.xplored.tplanner.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import seng.xplored.tplanner.models.*;


public interface EventRepository extends MongoRepository<Event, String> {
     
}