package com.kh.quiz.controller;

import com.kh.quiz.model.Question;
import com.kh.quiz.model.Quiz;
import com.kh.quiz.repository.QuestionRepository;
import com.kh.quiz.repository.QuizRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizController(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    // Obtenir tous les quizzes
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // Créer un nouveau quiz
    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // Mettre à jour un quiz existant
    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody Quiz updatedQuiz) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
        quiz.setTitle(updatedQuiz.getTitle());
        quiz.setCategory(updatedQuiz.getCategory());
        quiz.setDifficulty(updatedQuiz.getDifficulty());
        quiz.setQuestionCount(updatedQuiz.getQuestionCount());
        quiz.setCreatedAt(updatedQuiz.getCreatedAt());
        return quizRepository.save(quiz);
    }


    // Mettre à jour une question existante
    @PutMapping("/{quizId}/questions/{questionId}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long quizId,
            @PathVariable Long questionId,
            @RequestBody Question updatedQuestion) {

        // Vérifier si le quiz existe
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // Vérifier si la question existe dans ce quiz
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // Vérifier que la question appartient bien au quiz
        if (!question.getQuiz().getId().equals(quizId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Mettre à jour les champs de la question
        question.setText(updatedQuestion.getText());
        question.setOptions(updatedQuestion.getOptions());
        question.setCorrectAnswer(updatedQuestion.getCorrectAnswer());

        // Sauvegarder la question mise à jour
        Question savedQuestion = questionRepository.save(question);

        return ResponseEntity.ok(savedQuestion);
    }








    // Supprimer un quiz avec contrôle des questions associées
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long id) {
        try {
            // Vérifier si le quiz existe
            Quiz quiz = quizRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Quiz not found"));

            // Supprimer d'abord les questions associées
            List<Question> questions = questionRepository.findByQuizId(id);
            questionRepository.deleteAll(questions);

            // Ensuite, supprimer le quiz lui-même
            quizRepository.deleteById(id);

            return ResponseEntity.ok("Quiz supprimé avec succès !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la suppression du quiz");
        }
    }


    // Ajouter des questions à un quiz spécifique
    @PostMapping("/{quizId}/questions")
    public Quiz addQuestionsToQuiz(@PathVariable Long quizId, @RequestBody List<Question> questions) {
        // Trouver le quiz par son ID
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // Enregistrer chaque question
        for (Question question : questions) {
            question.setQuiz(quiz);  // Associer la question au quiz
            questionRepository.save(question);
        }

        return quiz;  // Retourner le quiz mis à jour
    }

    // Récupérer les questions d'un quiz spécifique
    @GetMapping("/{quizId}/questions")
    public List<Question> getQuestionsByQuizId(@PathVariable Long quizId) {
        // Utilisation de la méthode findByQuizId pour récupérer les questions liées au quiz
        return questionRepository.findByQuizId(quizId);
    }
}
