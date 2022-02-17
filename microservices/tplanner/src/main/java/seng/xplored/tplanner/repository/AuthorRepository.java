package seng.xplored.tplanner.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import seng.xplored.tplanner.model.Author;
public interface AuthorRepository extends MongoRepository<Author, String> {
}