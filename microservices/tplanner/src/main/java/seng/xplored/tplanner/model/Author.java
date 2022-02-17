package seng.xplored.tplanner.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "authors")
public class Author {
  @Id
  private String id;
  private String name;
  private Integer age;
  public Author() {
  }
  public Author(String id) {
    this.id = id;
  }
  public Author(String name, Integer age) {
    this.name = name;
    this.age = age;
  }
  public String getId() {
    return id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public Integer getAge() {
    return age;
  }
  public void setAge(Integer age) {
    this.age = age;
  }
  @Override
  public String toString() {
    return "User [id=" + id + ", name=" + name + ", age=" + age + "]";
  }
}