//package com.craig_briana.craig_briana.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//
//import javax.annotation.PostConstruct;
//import javax.sql.DataSource;
//import java.sql.Connection;
//import java.sql.SQLException;
//import java.sql.Statement;
//
//@Configuration
//public class DBInitializeConfig {
//
//    @Autowired
//    private DataSource dataSource;
//
//    @PostConstruct
//    public void initialize(){
//        try {
//            Connection connection = dataSource.getConnection();
//            Statement statement = connection.createStatement();
//            statement.execute("DROP TABLE IF EXISTS people");
//            statement.executeUpdate(
//                    "CREATE TABLE people(" +
//                            "id integer Primary key, " +
//                            "first_name varchar(30) not null, " +
//                            "last_name varchar(30) not null," +
//                            "email varchar(100) not null," +
//                            "phone_number varchar(30) not null)"
//            );
//            statement.executeUpdate(
//                    "INSERT INTO people " +
//                            "(id,first_name,last_name,email,phone_number) " +
//                            "VALUES " + "(1, 'Jane','Doe',"
//                            + " 'janedoe@gmail.com','8555555555')"
//            );
//            statement.close();
//            connection.close();
//        }
//        catch (SQLException e) {
//            e.printStackTrace();
//        }
//    }
//}
