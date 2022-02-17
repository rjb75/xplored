package seng.xplored.tplanner.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

import org.bson.types.ObjectId;
import seng.xplored.tplanner.models.User;

public interface UserRepository extends PagingAndSortingRepository<User, ObjectId> {
    List<User> findByIdIn(List<String> ids);

    User findOne(ObjectId id);

}
