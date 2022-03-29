package seng.xplored.tplanner;

import de.flapdoodle.embed.mongo.config.MongodConfig;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
@Configuration
public class MongoDbTestConfiguration {
    private static final String IP = "localhost";
    private static final int PORT = 28017; 
    @Bean
    public MongodConfig embeddedMongoConfiguration() throws IOException {
        return MongodConfig.builder()
                .version(Version.V3_2_20)
                .net(new Net(IP, PORT, Network.localhostIsIPv6()))
                .build();
    }
}