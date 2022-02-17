package seng.xplored.tplanner.services;

import java.util.List;

import seng.xplored.tplanner.models.Article;

public interface ArticleService {

    List<Article> findAllUserArticles(List<String> articleIds);
    
}
