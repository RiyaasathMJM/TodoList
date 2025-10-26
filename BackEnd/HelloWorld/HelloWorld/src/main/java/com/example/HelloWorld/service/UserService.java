package com.example.HelloWorld.service;

import com.example.HelloWorld.models.User;
import com.example.HelloWorld.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    //Autowire
    @Autowired
    private UserRepository userRepository;

    /* public UserService(){
        UserRepository=new UserRepository();
    }
*/
   /* public void printUser(){
        System.out.println(UserRepository.getAllUser());
    }

    */

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Integer id){

        return userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
    }



}