package com.kh.quiz.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.logging.Logger;

@Component
public class JwtTokenProvider {

    private final String jwtSecret = "MySuperSecretKeyForJwtTokenGeneration123456789";
    private final long jwtExpiration = 86400000; // 1 jour en ms
    private static final Logger logger = Logger.getLogger(JwtTokenProvider.class.getName());

    public String generateToken(String email, Long userId) {
        try {
            // Vérification avant génération
            logger.info("🔑 Tentative de génération du token pour : " + email);

            String token = Jwts.builder()
                    .setSubject(email)
                    .claim("userId", userId)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                    .signWith(SignatureAlgorithm.HS256, jwtSecret)
                    .compact();

            logger.info("✅ Token généré avec succès : " + token);
            return token;
        } catch (Exception e) {
            logger.severe("❌ Erreur lors de la génération du token : " + e.getMessage());
            throw new RuntimeException("Erreur lors de la génération du token", e);
        }
    }
}
