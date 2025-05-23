package com.kh.quiz.repository;

import com.kh.quiz.model.QuizResult;
import com.kh.quiz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUser(User user);

    Optional<QuizResult> findByQuizTitleAndUserIdAndDateCompleted(String quizTitle, Long userId, LocalDate dateCompleted);
}




