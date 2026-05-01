package com.example.authapi.service;

import com.example.authapi.dto.auth.LoginRequest;
import com.example.authapi.dto.auth.SignupRequest;
import com.example.authapi.dto.auth.UserResponse;
import com.example.authapi.entity.UserAccount;
import com.example.authapi.repository.UserAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserAccountRepository userAccountRepository, PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(SignupRequest request) {
        try {
            String username = normalizeUsername(request.username());
            if (userAccountRepository.existsByUsernameIgnoreCase(username)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "This username is already taken.");
            }

            if (!request.password().equals(request.confirmPassword())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password and confirm password must match.");
            }

            String firstName = normalizeNamePart(request.firstName());
            String lastName = normalizeNamePart(request.lastName());
            String fullName = firstName + " " + lastName;
            String mobileNumber = request.mobileNumber().trim();
            String generatedEmail = username + "@mahaesuvidha.local";

            UserAccount user = new UserAccount();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setUsername(username);
            user.setMobileNumber(mobileNumber);
            user.setFullName(fullName);
            user.setEmail(generatedEmail);
            user.setPasswordHash(passwordEncoder.encode(request.password()));

            userAccountRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UserResponse login(LoginRequest request) {
        String identifier = request.username().trim();
        UserAccount user = userAccountRepository
                .findByUsernameIgnoreCaseOrEmailIgnoreCase(identifier, identifier.toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid username or password."
                ));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password.");
        }

        return toUserResponse(user);
    }

    public boolean isUsernameAvailable(String username) {
        return !userAccountRepository.existsByUsernameIgnoreCase(normalizeUsername(username));
    }

    public UserResponse getAuthenticatedUser(Long userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged in.");
        }

        UserAccount user = userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session is no longer valid."));

        return toUserResponse(user);
    }

    private UserResponse toUserResponse(UserAccount user) {
        String fullName = user.getFullName();
        if (fullName == null || fullName.isBlank()) {
            fullName = String.join(" ", safe(user.getFirstName()), safe(user.getLastName())).trim();
        }

        String username = user.getUsername();
        if (username == null || username.isBlank()) {
            username = user.getEmail();
        }

        return new UserResponse(user.getId(), fullName, username, user.getMobileNumber());
    }

    private String normalizeNamePart(String value) {
        return value.trim().replaceAll("\\s+", " ");
    }

    private String normalizeUsername(String value) {
        return value.trim().toLowerCase();
    }

    private String safe(String value) {
        return value == null ? "" : value.trim();
    }
}
