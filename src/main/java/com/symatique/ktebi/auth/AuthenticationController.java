package com.symatique.ktebi.auth;

import com.symatique.ktebi.user.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name="Authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(

            @RequestBody @Valid RegistrationRequest request

    ) throws MessagingException {

        authenticationService.register(request);
        return ResponseEntity.accepted().build();

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthentificationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest request
    )
    {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        authenticationService.activateAccount(token);
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        User user = authenticationService.getCurrentUser();

        // Create a response map with user details
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("firstname", user.getFirstname());
        response.put("lastname", user.getLastname());
        response.put("dateOfBirth", user.getDateOfBirth());
        response.put("email", user.getEmail());
        response.put("accountLocked", user.isAccountLocked());
        response.put("enabled", user.isEnabled());
        response.put("roles", user.getRoles().stream()
                .map(role -> role.getName())  // Adjust based on role retrieval
                .collect(Collectors.toList()));
        response.put("createdDate", user.getCreatedDate());
        response.put("lastModifiedDate", user.getLastModifiedDate());

        return ResponseEntity.ok(response);
    }

}
