package com.example.HelloWorld.repository;

import com.example.HelloWorld.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;


//@Component
public interface TodoRepository extends JpaRepository<Todo, Integer> {

    //String getAllTodo(){
    //    return  "todo Streaming";// It will return the values in todo table
    // }


}
