package com.example.authapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank(message = "Full name is required.")
        @Size(min = 2, max = 80, message = "Full name must be between 2 and 80 characters.")
        String fullName,

        @NotBlank(message = "Email is required.")
        @Email(message = "Please provide a valid email address.")
        String email,

        @NotBlank(message = "Password is required.")
        @Size(min = 6, max = 100, message = "Password must be at least 6 characters long.")
        String password
) {
}

