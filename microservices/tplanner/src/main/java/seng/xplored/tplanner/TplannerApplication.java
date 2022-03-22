package seng.xplored.tplanner;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TplannerApplication {
	public static void main(String[] args) {
		System.out.println("Hello World!");

		EnvironmentLoader env = EnvironmentLoader.getInstance();

		SpringApplication app = new SpringApplication(TplannerApplication.class);
        app.setDefaultProperties(Collections
          .singletonMap("server.port", env.getPORT()));
        app.run(args);

		DataHandler program = new DataHandler(env);
		DBConnect db = new DBConnect(env);
	}

}
