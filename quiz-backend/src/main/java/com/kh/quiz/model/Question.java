package com.kh.quiz.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ElementCollection
    private List<String> options;

    private Integer correctAnswer;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;
}
