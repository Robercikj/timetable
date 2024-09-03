package pl.jakubowskir.timetable.oAuth2;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/timetable")
public class SecurityController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    public SecurityController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // endpoint rejestracja
    @PostMapping ("/register")
    public ResponseEntity<String> register(@RequestBody UserDto userDto) {
        if (userService.existsByNickname(userDto.getNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Użytkownik o takim loginie już istnieje");
        }
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userService.saveUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Użytkownik został zarejestrowany");
    }
    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Zalogowano pomyślnie");
    }
}




//@GetMapping
//  public ResponseEntity <String> hello () {
// return ResponseEntity.ok("Hello security");
//}