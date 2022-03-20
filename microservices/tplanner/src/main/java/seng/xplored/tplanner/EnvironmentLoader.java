package seng.xplored.tplanner;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvBuilder;

//Singleton Class
public class EnvironmentLoader {
    private static EnvironmentLoader instance;

    private final String PORT;
    private final String DB_URL;
    private final String HOST;

    public String getPORT() {
        return this.PORT;
    }


    public String getDB_URL() {
        return this.DB_URL;
    }


    public String getHOST() {
        return this.HOST;
    }


    private EnvironmentLoader (){
        //Retrieve ENV Variables

        Dotenv env = Dotenv.configure().directory("../../").load();
        this.PORT = env.get("TPLANNER_PORT");
        this.DB_URL = env.get("TPLANNER_MONGODB_URL");
        this.HOST = env.get("TPLANNER_HOST");
    }

    public static EnvironmentLoader getInstance(){
      if (instance == null){
        instance = new EnvironmentLoader();
      }
      return instance;
    }
}
