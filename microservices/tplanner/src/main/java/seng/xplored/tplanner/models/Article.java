package seng.xplored.tplanner.models;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "articles")
public class Article {

    private ObjectId id;

    private String title;
    private Integer minutesRead;
    private String authorId;
}