package seng.xplored.tplanner.models;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "users")
public class User {
    private ObjectId id;
    private String name;
    private Integer age;
    private Date createdAt;
    private List<String> friendsIds;
    private List<String> articlesIds;
    public List<String> getArticlesIds() {
        return articlesIds;
    }

    public User(String name, Integer age, Date createdAt){
        this.name = name;
        this.age = age;
        this.createdAt = createdAt;
    }

}