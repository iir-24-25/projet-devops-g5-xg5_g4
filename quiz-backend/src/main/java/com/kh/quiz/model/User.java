package com.kh.quiz.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // ✅ pour éviter les conflits avec le mot réservé "user"
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private int quizzesTaken;    // Nombre de quizzes réalisés
    private double averageScore; // Score moyen des quizzes
    private String lastQuizDate; // Date du dernier quiz

    // Getters et Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getQuizzesTaken() { return quizzesTaken; }
    public void setQuizzesTaken(int quizzesTaken) { this.quizzesTaken = quizzesTaken; }

    public double getAverageScore() { return averageScore; }
    public void setAverageScore(double averageScore) { this.averageScore = averageScore; }

    public String getLastQuizDate() { return lastQuizDate; }
    public void setLastQuizDate(String lastQuizDate) { this.lastQuizDate = lastQuizDate; }
}
