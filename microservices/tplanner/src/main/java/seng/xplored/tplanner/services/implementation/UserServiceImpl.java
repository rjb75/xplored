package seng.xplored.tplanner.services.implementation;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import seng.xplored.tplanner.models.User;
import seng.xplored.tplanner.repositories.UserRepository;
import seng.xplored.tplanner.services.UserService;

import java.util.ArrayList;
import java.util.List;
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAllUsers() {
        return (ArrayList) userRepository.findAll();
    }

    @Override
    public User findOneById(ObjectId id) {
        return userRepository.findOne(id);
    }

    @Override
    public List<User> findByIdIn(List<String> ids) {
        return userRepository.findByIdIn(ids);
    }
}