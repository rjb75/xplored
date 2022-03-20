package seng.xplored.tplanner.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//Combination of event and EventType
@Document("event")
public class Event{
    @Id
    private String event_id;
    private Type type;
    private String start_time;
    private String end_time;
    private String name;
    private String address;
    private String link;
    private String data;
    private String photo_URL;

    public String getPhoto_URL() {
        return this.photo_URL;
    }

    public void setPhoto_URL(String photo_URL) {
        this.photo_URL = photo_URL;
    }

    public Event(String event_id, Type type, String start_time, String end_time, String name, String address, String link, String data, String photo_URL) {
        this.event_id = event_id;
        this.type = type;
        this.start_time = start_time;
        this.end_time = end_time;
        this.name = name;
        this.address = address;
        this.link = link;
        this.data = data;
        this.photo_URL = photo_URL;
    }


    public String getEvent_id() {
        return this.event_id;
    }

    public void setEvent_id(String event_id) {
        this.event_id = event_id;
    }

    public Type getType() {
        return this.type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getStart_time() {
        return this.start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return this.end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLink() {
        return this.link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getData() {
        return this.data;
    }

    public void setData(String data) {
        this.data = data;
    }
}