package pl.jakubowskir.timetable.oAuth2;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.jakubowskir.timetable.repository.UserRepository;

import java.util.Optional;

@Component
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setNickname(userDto.getNickname());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        log.info(userRepository.findAll().toString());
    }

    /**
     * TOKENY JWT BEDA POZNIEJ ZAIMPLEMENTOWANE, NA RAZIE ZWRACAMY USERNAME
     */
    public String login (UserDto userDto) {
        User user = getUser(userDto.getNickname()).orElseThrow(
                () -> new RuntimeException("User with the provided nickname doesn't exist")
        );
        if (passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            return user.getNickname();
        }
        throw new RuntimeException("Password doesn't match");
    }

    private Optional<User> getUser(String nickname) {
        return userRepository.findByNickname(nickname);
    }
}
