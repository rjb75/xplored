package seng.xplored.tplanner.graphql_utilities;

import graphql.GraphQL;
import graphql.schema.DataFetcher;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import seng.xplored.tplanner.data_fetchers.ArticlesDataFetcher;
import seng.xplored.tplanner.data_fetchers.UserDataFetcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;


import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

import static graphql.GraphQL.newGraphQL;
import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

@Component
public class GraphQlUtility {

    @Value("classpath:schemas.graphqls")
    private Resource schemaResource;
    private GraphQL graphQL;
    private UserDataFetcher userDataFetcher;
    private ArticlesDataFetcher articlesDataFetcher;

    @Autowired
    GraphQlUtility(UserDataFetcher userDataFetcher,
                   ArticlesDataFetcher articlesDataFetcher) throws IOException {
        this.userDataFetcher = userDataFetcher;
        this.articlesDataFetcher = articlesDataFetcher;
    }

    @PostConstruct
    public GraphQL createGraphQlObject() throws IOException {
        File schemas = schemaResource.getFile();
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemas);
        RuntimeWiring wiring = buildRuntimeWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
        return  newGraphQL(schema).build();
    }

    public RuntimeWiring buildRuntimeWiring(){
        return newRuntimeWiring()
                .type("Query", typeWiring -> typeWiring
                    .dataFetcher("user", userDataFetcher))
                .type("User", typeWiring -> typeWiring
                    .dataFetcher("articles", (DataFetcher) articlesDataFetcher))
                .build();
    }
}
