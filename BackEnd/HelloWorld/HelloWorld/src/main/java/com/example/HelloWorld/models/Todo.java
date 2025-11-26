package com.example.HelloWorld.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Todo {
    @Id
    @GeneratedValue
    Integer id;
    String title;
    Boolean isCompleted;
    LocalDate date;
}