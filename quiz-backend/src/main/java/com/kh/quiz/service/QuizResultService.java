package com.kh.quiz.service;

import com.kh.quiz.model.QuizResult;
import com.kh.quiz.model.User;
import com.kh.quiz.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class QuizResultService {

    @Autowired
    private QuizResultRepository quizResultRepository;

    public QuizResult saveOrUpdateResult(QuizResult quizResult) {
        try {
            // Vérification de l'existence du résultat
            Optional<QuizResult> existingResult = quizResultRepository
                    .findByQuizTitleAndUserIdAndDateCompleted(
                            quizResult.getQuizTitle(),
                            quizResult.getUser().getId(),
                            quizResult.getDateCompleted()
                    );

            if (existingResult.isPresent()) {
                // Mettre à jour le résultat existant
                QuizResult resultToUpdate = existingResult.get();
                resultToUpdate.setScore(quizResult.getScore());
                resultToUpdate.setCorrectAnswers(quizResult.getCorrectAnswers());
                resultToUpdate.setIncorrectAnswers(quizResult.getIncorrectAnswers());
                resultToUpdate.setTotalQuestions(quizResult.getTotalQuestions());
                resultToUpdate.setStatus(quizResult.getStatus());
                resultToUpdate.setTimeSpent(quizResult.getTimeSpent());
                return quizResultRepository.save(resultToUpdate);
            }

            // Sinon, enregistrer un nouveau résultat
            return quizResultRepository.save(quizResult);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de la sauvegarde du résultat du quiz : " + e.getMessage());
        }
    }





    public List<QuizResult> getResultsByUser(User user) {
        return quizResultRepository.findByUser(user);
    }
}


