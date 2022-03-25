package seng.xplored.tplanner.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import seng.xplored.tplanner.models.*;


public interface UserRepository extends MongoRepository<User, String> {
    User findByAuthId(String authId);
}