package com.example.HelloWorld.controller;

import com.example.HelloWorld.models.Todo;
import com.example.HelloWorld.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")

public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/get1")
    String getTodo() {
        //  todoService.printTodo();
        return "Todo";
    }


    @GetMapping("/create2")
    String getDetails(@RequestParam String userId,String password){
        return  "Username:" + userId+"  Password:"+password;
    }
    // For privacy purpose
    @PostMapping("/create1")
    String getDetails1(@RequestBody String body){
        return body;
    }

    @PutMapping("/{id}")
    ResponseEntity<Todo> updateTodoById(@PathVariable Integer id, @RequestBody Todo todo) {
        todo.setId(id);
        return new ResponseEntity<>(todoService.updateTodo(todo), HttpStatus.OK);

    }
    
//Create Todo
    @PostMapping("/create")
    ResponseEntity<Todo> createTodo(@RequestBody Todo todo){
        return  new ResponseEntity<>(todoService.createTodo(todo),HttpStatus.CREATED);
    }

    // returning Todo by Id
    @GetMapping("/{id}")
    ResponseEntity<Todo> getTodoById(@PathVariable Integer id) {
        return new ResponseEntity<>(todoService.getTodoById(id),HttpStatus.OK);
    }

    //returning  Todos in a list
    @GetMapping("/get")
    ResponseEntity<List<Todo>> getTodos(){
        return new ResponseEntity<>(todoService.getTodos(),HttpStatus.OK);
    }

    @PutMapping("/update")
    ResponseEntity<Todo> updateTodoCon(@RequestBody Todo todo){
        return  new ResponseEntity<>(todoService.updateTodo(todo),HttpStatus.ACCEPTED);
    }

    @DeleteMapping ("/{id}")
    void DeleteToDoById(@PathVariable int id){

        todoService.deleteTodoById(id);
    };

    @GetMapping("/page")
    ResponseEntity<Page<Todo>> getTodosPaged(@RequestParam int page ,@RequestParam int size){
        return new ResponseEntity<>(todoService.getAllTodoPages(page, size),HttpStatus.OK);
    }

}