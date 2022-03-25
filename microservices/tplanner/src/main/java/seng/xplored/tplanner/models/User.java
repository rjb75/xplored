package seng.xplored.tplanner.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "user")
public class User {
    @Id
    private String id;
    private String authId;
    private String[] trips;

    public User(String id, String authId, String[] trips) {
        this.id = id;
        this.authId = authId;
        this.trips = trips;
    }

    public String getAuthId() {
        return this.authId;
    }

    public void setAuthId(String authId) {
        this.authId = authId;
    }



    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getTrips() {
        return this.trips;
    }

    public void setTrips(String[] trips) {
        this.trips = trips;
    }

    
}
