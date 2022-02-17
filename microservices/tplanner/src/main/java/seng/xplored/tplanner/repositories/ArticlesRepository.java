package seng.xplored.tplanner.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

import org.bson.types.ObjectId;

import seng.xplored.tplanner.models.Article;
import seng.xplored.tplanner.models.User;

public interface ArticlesRepository extends PagingAndSortingRepository<User, ObjectId> {

    List<Article> findByIdIn(List<String> ids);
    
}
