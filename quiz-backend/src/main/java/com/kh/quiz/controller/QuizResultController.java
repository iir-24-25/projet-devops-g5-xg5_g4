package com.kh.quiz.controller;

import com.kh.quiz.model.QuizResult;
import com.kh.quiz.model.User;
import com.kh.quiz.service.QuizResultService;
import com.kh.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/quiz-results")
public class QuizResultController {

    @Autowired
    private QuizResultService quizResultService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public ResponseEntity<?> saveOrUpdateResult(@RequestBody QuizResult quizResult) {
        try {
            System.out.println("📥 Données reçues du frontend : " + quizResult);

            if (quizResult.getUser() != null && quizResult.getUser().getId() != null) {
                User user = userRepository.findById(quizResult.getUser().getId()).orElse(null);

                if (user == null) {
                    System.out.println("❌ Utilisateur non trouvé");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Utilisateur non trouvé");
                }

                quizResult.setUser(user);

                if (quizResult.getDateCompleted() == null) {
                    quizResult.setDateCompleted(LocalDate.now());
                }

                QuizResult savedResult = quizResultService.saveOrUpdateResult(quizResult);
                System.out.println("✅ Résultat enregistré dans la base : " + savedResult);
                return ResponseEntity.ok(savedResult);
            } else {
                System.out.println("❌ Données utilisateur non valides");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Données utilisateur non valides");
            }
        } catch (Exception e) {
            System.err.println("❌ Erreur interne lors de l'enregistrement : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne : " + e.getMessage());
        }
    }







    @GetMapping("/user/{userId}")
    public List<QuizResult> getResultsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? quizResultService.getResultsByUser(user) : null;
    }
}
