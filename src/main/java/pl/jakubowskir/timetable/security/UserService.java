package pl.jakubowskir.timetable.security;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.jakubowskir.timetable.repository.UserRepository;

import java.util.Optional;

@Component
@Slf4j
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public boolean existsByUsername(String nickname) {
        return userRepository.existsByUsername(nickname);
    }

    public User register(UserDto userDto) {
        return register(userDto, Role.ADMIN);
    }

    public User register(UserDto userDto, Role role) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(role);
        return userRepository.save(user);
    }

    public User authenticate(UserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepository.findByUsername(input.getUsername())
                .orElseThrow();
    }

    private Optional<User> getUser(String nickname) {
        return userRepository.findByUsername(nickname);
    }
}
