package pl.jakubowskir.timetable.oAuth2;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/timetable")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class SecurityController {

    private final UserService userService;

    @Autowired
    public SecurityController(UserService userService) {
        this.userService = userService;
    }

    // endpoint rejestracja
    @PostMapping ("/register")
    public ResponseEntity<String> register(@RequestBody UserDto userDto) {
        if (userService.existsByNickname(userDto.getNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Użytkownik o takim loginie już istnieje");
        }
        log.info(userDto.getNickname());
        log.info(userDto.getPassword());
        userService.saveUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Użytkownik został zarejestrowany");
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto) {
        try {
            String username = userService.login(userDto); // Tak sie nie robi, to jest na chwile
            return ResponseEntity.ok(username);
        } catch (RuntimeException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }
    }
}




//@GetMapping
//  public ResponseEntity <String> hello () {
// return ResponseEntity.ok("Hello security");
//}