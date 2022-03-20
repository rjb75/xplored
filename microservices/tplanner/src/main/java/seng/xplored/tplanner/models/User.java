package seng.xplored.tplanner.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document("user")
public class User {
    @Id
    private String id;
    private Trip[] trips;

    public User(String id, Trip[] trips) {
        this.id = id;
        this.trips = trips;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Trip[] getTrips() {
        return this.trips;
    }

    public void setTrips(Trip[] trips) {
        this.trips = trips;
    }

    
}
