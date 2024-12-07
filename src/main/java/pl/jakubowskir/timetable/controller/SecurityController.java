package pl.jakubowskir.timetable.controller;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.jakubowskir.timetable.security.JwtService;
import pl.jakubowskir.timetable.payload.LoginResponse;
import pl.jakubowskir.timetable.dto.RegistrationDto;
import pl.jakubowskir.timetable.model.User;
import pl.jakubowskir.timetable.dto.UserDto;
import pl.jakubowskir.timetable.service.UserService;
import pl.jakubowskir.timetable.user.current.CurrentUserProvider;

@RestController
@RequestMapping("/api/v1/timetable")
@AllArgsConstructor
@Slf4j
public class SecurityController {

    private final UserService userService;
    private final JwtService jwtService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping ("/register")
    public ResponseEntity<Void> register(@RequestBody RegistrationDto registrationDto) {
        if (userService.existsByUsername(registrationDto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        userService.register(registrationDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody UserDto loginUserDto) {
        User authenticatedUser = userService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime(), authenticatedUser.getUsername(), authenticatedUser.getRole());

        return ResponseEntity.ok(loginResponse);
    }

}




