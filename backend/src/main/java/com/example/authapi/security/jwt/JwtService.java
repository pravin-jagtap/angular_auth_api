package com.example.authapi.security.jwt;

import com.example.authapi.dto.auth.UserResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long expirationMs;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.secret.expiration-ms}") long expirationMs) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    public String generateToken(UserResponse user) {
        Date now = new Date();
        Date expireAt = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(String.valueOf(user.id()))
                .claim("username", user.username())
                .issuedAt(now)
                .expiration(expireAt)
                .signWith(secretKey)
                .compact();
    }

    public Long extractUserId(String token) {
        return Long.valueOf(extractClaim(token).getSubject());
    }

    public boolean isValid(String token) {
        extractClaim(token);
        return true;
    }

    public long getExpirationSeconds() {
        return expirationMs / 1000;
    }

    private Claims extractClaim(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
