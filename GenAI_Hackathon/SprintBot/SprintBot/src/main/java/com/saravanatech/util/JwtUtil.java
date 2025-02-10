package com.saravanatech.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.util.Date;

@Component
public class JwtUtil {

    private static final SecretKey key = generateSecretKey(); // Generate key directly
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    // Generate a cryptographically secure secret key
    private static SecretKey generateSecretKey() {
        byte[] keyBytes = new byte[32]; // 256-bit key
        new SecureRandom().nextBytes(keyBytes);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    // 🔹 Generate JWT Token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Set subject
                .setIssuedAt(new Date()) // Set issued time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Expiry time
                .signWith(key) // Sign using secret key
                .compact(); // Build token
    }

    // 🔹 Extract Username from Token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // Use the same key for verification
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 🔹 Validate JWT Token
    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    // 🔹 Check if Token is Expired
    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}