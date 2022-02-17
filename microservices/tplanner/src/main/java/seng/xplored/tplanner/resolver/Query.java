package seng.xplored.tplanner.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import seng.xplored.tplanner.model.Author;
import seng.xplored.tplanner.repository.AuthorRepository;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

@Component
public class Query implements GraphQLQueryResolver {
  private AuthorRepository authorRepository;
  @Autowired
  public Query(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }
  public Iterable<Author> findAllAuthors() {
    return authorRepository.findAll();
  }

  public long countAuthors() {
    return authorRepository.count();
  }

}