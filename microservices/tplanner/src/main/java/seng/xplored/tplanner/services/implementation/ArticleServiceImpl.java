package seng.xplored.tplanner.services.implementation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import seng.xplored.tplanner.models.Article;
import seng.xplored.tplanner.repositories.ArticlesRepository;
import seng.xplored.tplanner.services.ArticleService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticlesRepository articleRepository;

    @Autowired
    ArticleServiceImpl(ArticlesRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    @Override
    public List<Article> findAllUserArticles(List<String> ids) {
        return articleRepository.findByIdIn(ids);
    }
}