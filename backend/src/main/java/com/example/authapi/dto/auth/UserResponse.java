package com.example.authapi.dto.auth;

public record UserResponse(Long id, String fullName, String username, String mobileNumber) {
}
