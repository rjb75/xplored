package seng.xplored.tplanner.models;

import org.springframework.http.HttpStatus;


import java.time.LocalDateTime;

public class Failure {
    private LocalDateTime timestamp;
    private HttpStatus status;

    public Failure(LocalDateTime timestamp, HttpStatus status) {
        this.timestamp = timestamp;
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public HttpStatus getStatus() {
        return this.status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

}
