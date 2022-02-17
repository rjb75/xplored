package seng.xplored.tplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TplannerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TplannerApplication.class, args);
		System.out.println("Hello World!");

	}

}

// heroku config:set MONGODB_URI="mongodb+srv://dbUser:dLaZzRLM0S56WTgO@cluster0.psv3h.mongodb.net/tplanner?retryWrites=true&w=majority"
