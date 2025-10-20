package com.example.HelloWorld.service;

import com.example.HelloWorld.models.Todo;
import com.example.HelloWorld.models.User;
import com.example.HelloWorld.repository.TodoRepository;
import com.example.HelloWorld.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    //Autowire
    @Autowired
    private TodoRepository todoRepository;

    /* public UserService(){
        UserRepository=new UserRepository();
    }
*/
   /* public void printUser(){
        System.out.println(UserRepository.getAllUser());
    }

    */

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo getTodoById1(Integer id) {
        return todoRepository.getReferenceById(id);

    }
    public Todo getTodoById(Integer id){

        return todoRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
    }

    public List<Todo> getTodos(){
        return todoRepository.findAll();
    }

    public Todo updateTodo(Todo todo){
        return todoRepository.save(todo);
    }
    public void deleteTodoById(Integer id){
        todoRepository.delete(getTodoById(id));
    }

    //Pagination
    public Page<Todo> getAllTodoPages(int page, int size){
        Pageable pageable=PageRequest.of(page,size);
        return todoRepository.findAll(pageable);
    }



}