package seng.xplored.tplanner.resolver;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import seng.xplored.tplanner.model.Author;
import seng.xplored.tplanner.repository.AuthorRepository;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;

@Component
public class Mutation implements GraphQLMutationResolver {
  private AuthorRepository authorRepository;
  @Autowired
  public Mutation(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }
  public Author createAuthor(String name, Integer age) {
    Author author = new Author();
    author.setName(name);
    author.setAge(age);
    authorRepository.save(author);
    return author;
  }
}