package com.kh.quiz.controller;

import com.kh.quiz.config.JwtTokenProvider;
import com.kh.quiz.model.User;
import com.kh.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5174") // frontend port Vite
public class AuthController {


    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Map<String, String> userData) {
        String name = userData.get("name");
        String email = userData.get("email");
        String password = userData.get("password");

        if (userRepository.findByEmail(email) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email déjà utilisé");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password); // ⚠️ Hashage à ajouter en prod

        userRepository.save(user);

        return ResponseEntity.ok("Utilisateur créé avec succès !");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            User user = userRepository.findByEmail(email);
            if (user == null || !user.getPassword().equals(password)) {
                return ResponseEntity.status(401).body(Map.of("error", "Email ou mot de passe invalide"));
            }

            // Vérification avant la génération du token
            System.out.println("🟢 Utilisateur trouvé : " + user.getEmail());

            String token = jwtTokenProvider.generateToken(user.getEmail(), user.getId());

            return ResponseEntity.ok(Map.of(
                    "message", "Connexion réussie",
                    "user", Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail()
                    ),
                    "token", token
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Erreur serveur : " + e.getMessage()));
        }
    }

}


