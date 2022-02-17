package seng.xplored.tplanner.data_fetchers;
import graphql.schema.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import seng.xplored.tplanner.models.Article;
import seng.xplored.tplanner.models.User;
import seng.xplored.tplanner.services.ArticleService;

import java.util.ArrayList;
import java.util.List;
public class ArticlesDataFetcher implements DataFetcher<List<Article>>{
    
    private final ArticleService articleService;

    @Autowired
    ArticlesDataFetcher(ArticleService articleService){
        this.articleService = articleService;
    }

    @Override
    public List<Article> get(DataFetchingEnvironment env) {
        User user = env.getSource();
        List<String> articleIds = new ArrayList<>();
        if(user!=null){
            articleIds = user.getArticlesIds();
        }
        List<Article> articles = articleService.findAllUserArticles(articleIds);
        return articles;
    }
}
