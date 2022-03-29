package seng.xplored.tplanner;

import de.flapdoodle.embed.mongo.config.MongodConfig;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 

// IMongodConfig -> MongodConfig
// IRuntimeConfig -> RuntimeConfig

// new MongoConfigBuilder -> MongoConfig.builder()

// new RuntimeConfigBuilder().defaultsWithLogger(Command.MongoD, logger.underlying).build() -> Defaults.runtimeConfigFor(Command.MongoD, logger.underlying).build()

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