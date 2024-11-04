package pl.jakubowskir.timetable.security;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/timetable")
@AllArgsConstructor
@Slf4j
public class SecurityController {

    private final UserService userService;
    private final JwtService jwtService;

    // endpoint rejestracja
    @PostMapping ("/register")
    public ResponseEntity<String> register(@RequestBody UserDto userDto) {
        if (userService.existsByUsername(userDto.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Użytkownik o takim loginie już istnieje");
        }
        userService.register(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Użytkownik został zarejestrowany");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody UserDto loginUserDto) {
        User authenticatedUser = userService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime(), authenticatedUser.getUsername());

        return ResponseEntity.ok(loginResponse);
    }
}




