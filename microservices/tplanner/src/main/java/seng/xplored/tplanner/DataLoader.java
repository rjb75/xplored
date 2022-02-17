package seng.xplored.tplanner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import seng.xplored.tplanner.models.Article;
import seng.xplored.tplanner.models.User;
import seng.xplored.tplanner.repositories.ArticlesRepository;
import seng.xplored.tplanner.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.util.*;

@Component
public class DataLoader {
    private final UserRepository userRepository;
    private final ArticlesRepository articlesRepository;

    @Autowired
    DataLoader(UserRepository userRepository, ArticlesRepository articlesRepository){
        this.userRepository = userRepository;
        this.articlesRepository = articlesRepository;
    }

    @PostConstruct
    private void generateData(){
        List<User> users = new ArrayList<>();

        users.add( new User("Igor", 12, new Date()));
        users.add( new User("Ellen", 12, new Date()));
        users.add( new User("John", 12, new Date()));
        users.add( new User("Horse", 12, new Date()));

        // users.add(User.builder().name("Igor").createdAt(new Date()).age(24).articlesIds(new ArrayList<>()).articlesIds(new ArrayList<>()).build());
        // users.add(User.builder().name("Ellen").createdAt(new Date()).age(24).articlesIds(new ArrayList<>()).articlesIds(new ArrayList<>()).build());
        // users.add(User.builder().name("John").createdAt(new Date()).age(24).articlesIds(new ArrayList<>()).articlesIds(new ArrayList<>()).build());
        // users.add(User.builder().name("Horse").createdAt(new Date()).age(24).articlesIds(new ArrayList<>()).articlesIds(new ArrayList<>()).build());
        users = (ArrayList) userRepository.saveAll(users);
    }
}
