package com.kh.quiz.controller;

import com.kh.quiz.model.User;
import com.kh.quiz.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Obtenir tous les utilisateurs
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Supprimer un utilisateur par ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }



    // Mettre à jour un utilisateur existant (y compris les statistiques)
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    user.setQuizzesTaken(updatedUser.getQuizzesTaken());
                    user.setAverageScore(updatedUser.getAverageScore());
                    user.setLastQuizDate(updatedUser.getLastQuizDate());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    // Connexion administrateur (sans champ "role")
    @PostMapping("/admin/login")
    public Map<String, String> adminLogin(@RequestBody User loginUser) {
        // Identifiants fixes de l'admin
        String adminEmail = "admin@gmail.com";
        String adminPassword = "admin123";

        // Vérifier les informations d'identification admin
        if (adminEmail.equals(loginUser.getEmail()) && adminPassword.equals(loginUser.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("user", "admin");
            response.put("id", "1");
            response.put("token", "admin_jwt_token");
            return response;
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin credentials");
    }


}
