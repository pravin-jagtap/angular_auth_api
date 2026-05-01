package com.example.authapi.controller;

import com.example.authapi.dto.auth.AuthResponse;
import com.example.authapi.dto.auth.LoginRequest;
import com.example.authapi.dto.MessageResponse;
import com.example.authapi.dto.auth.SignupRequest;
import com.example.authapi.dto.auth.UserResponse;
import com.example.authapi.dto.auth.UsernameAvailabilityResponse;
import com.example.authapi.security.CustomUserPrincipal;
import com.example.authapi.security.jwt.JwtService;
import com.example.authapi.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> signup(@Valid @RequestBody SignupRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MessageResponse("Account created successfully. Please sign in with your username."));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpServletRequest,
            HttpSession session
    ) {
        UserResponse user = authService.login(request);
        String token = jwtService.generateToken(user);

//        httpServletRequest.changeSessionId();
//        session.setAttribute("USER_ID", user.id());

        return ResponseEntity.ok(new AuthResponse("Login successful.", user, token,
                "Bearer", jwtService.getExpirationSeconds()));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> logout(HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.invalidate();
//        }
        return ResponseEntity.ok(new MessageResponse("Logged out successfully."));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(Authentication authentication) {
        CustomUserPrincipal principal =(CustomUserPrincipal) authentication.getPrincipal();
        UserResponse user = authService.getAuthenticatedUser(principal.getId());

        return ResponseEntity.ok(new AuthResponse(
                "Authenticated user loaded.",
                user,
                null,
                "Bearer",
                jwtService.getExpirationSeconds()
        ));
    }

    @GetMapping("/username-availability")
    public ResponseEntity<UsernameAvailabilityResponse> usernameAvailability(@RequestParam String username) {
        boolean available = authService.isUsernameAvailable(username);
        String message = available ? "Username is available." : "This username is already taken.";
        return ResponseEntity.ok(new UsernameAvailabilityResponse(available, message));
    }
}
