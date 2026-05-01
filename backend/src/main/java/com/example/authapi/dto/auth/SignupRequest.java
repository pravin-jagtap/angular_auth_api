package com.example.authapi.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank(message = "First name is required.")
        @Size(min = 2, max = 40, message = "First name must be between 2 and 40 characters.")
        String firstName,

        @NotBlank(message = "Last name is required.")
        @Size(min = 2, max = 40, message = "Last name must be between 2 and 40 characters.")
        String lastName,

        @NotBlank(message = "Username is required.")
        @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.")
        @Pattern(
                regexp = "^[a-zA-Z0-9._-]+$",
                message = "Username can use letters, numbers, dots, underscores, and hyphens only."
        )
        String username,

        @NotBlank(message = "Password is required.")
        @Size(min = 8, max = 100, message = "Password must be at least 8 characters long.")
        String password,

        @NotBlank(message = "Please confirm your password.")
        String confirmPassword,

        @NotBlank(message = "Mobile number is required.")
        @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be exactly 10 digits.")
        String mobileNumber,

        String email

) {
}
