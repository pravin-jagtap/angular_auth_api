package com.example.authapi.controller;

import com.example.authapi.dto.AuthResponse;
import com.example.authapi.dto.LoginRequest;
import com.example.authapi.dto.MessageResponse;
import com.example.authapi.dto.SignupRequest;
import com.example.authapi.dto.UserResponse;
import com.example.authapi.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> signup(@Valid @RequestBody SignupRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MessageResponse("Account created successfully. Please sign in."));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpServletRequest,
            HttpSession session
    ) {
        UserResponse user = authService.login(request);
        httpServletRequest.changeSessionId();
        session.setAttribute("USER_ID", user.id());

        return ResponseEntity.ok(new AuthResponse("Login successful.", user));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok(new MessageResponse("Logged out successfully."));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Long userId = session != null ? (Long) session.getAttribute("USER_ID") : null;
        UserResponse user = authService.getAuthenticatedUser(userId);
        return ResponseEntity.ok(new AuthResponse("Authenticated user loaded.", user));
    }
}
