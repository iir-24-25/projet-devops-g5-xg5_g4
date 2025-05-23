package com.kh.quiz.repository;

import com.kh.quiz.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    // Méthode pour récupérer les questions d'un quiz en particulier
    List<Question> findByQuizId(Long quizId);
}














