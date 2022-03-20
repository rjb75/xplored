package seng.xplored.tplanner.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document("trip")
public class Trip {
    @Id
    private String trip_id;
    private String name;
    private String photo_URL;
    private Event[] events;

    public Trip(String trip_id, String name, String photo_URL, Event[] events) {
        this.trip_id = trip_id;
        this.name = name;
        this.photo_URL = photo_URL;
        this.events = events;
    }


    public String getTrip_id() {
        return this.trip_id;
    }

    public void setTrip_id(String trip_id) {
        this.trip_id = trip_id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto_URL() {
        return this.photo_URL;
    }

    public void setPhoto_URL(String photo_URL) {
        this.photo_URL = photo_URL;
    }

    public Event[] getEvents() {
        return this.events;
    }

    public void setEvents(Event[] events) {
        this.events = events;
    }
    
}
