package com.example.authapi.dto.auth;

public record AuthResponse(String message, UserResponse user, String token, String tokenType,
                           long expirationInSeconds) {
}

