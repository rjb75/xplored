package seng.xplored.tplanner.models;

public class Failure {
    private String timestamp;
    private String status;
    private String error;

    public String getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getError() {
        return this.error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Failure(String timestamp, String status, String error) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
    }
}
