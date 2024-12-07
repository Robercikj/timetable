package pl.jakubowskir.timetable.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.jakubowskir.timetable.dto.UserDto;
import pl.jakubowskir.timetable.model.Role;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.model.User;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.repository.TrainerRepository;
import pl.jakubowskir.timetable.repository.UserRepository;
import pl.jakubowskir.timetable.security.JwtService;
import pl.jakubowskir.timetable.dto.RegistrationDto;

import java.util.Optional;

@Component
@Slf4j
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TrainerRepository trainerRepository;
    private final TraineeRepository traineeRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public boolean existsByUsername(String nickname) {
        return userRepository.existsByUsername(nickname);
    }


    public User register(RegistrationDto registrationDto) {
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setRole(registrationDto.getRole());
        log.info("Registration ongoing");
        if (registrationDto.getRole() == Role.TRAINEE) {
            Trainee trainee = new Trainee();
            trainee.setUser(user);
            trainee.setFirstName(registrationDto.getFirstName());
            trainee.setLastName(registrationDto.getLastName());
            trainee.setPhoneNumber(registrationDto.getPhoneNumber());
            trainee.setEmail(registrationDto.getEmail());
            traineeRepository.save(trainee);
        }
        else if (registrationDto.getRole() == Role.TRAINER) {
            Trainer trainer = new Trainer();
            trainer.setUser(user);
            trainer.setFirstName(registrationDto.getFirstName());
            trainer.setLastName(registrationDto.getLastName());
            trainer.setPhoneNumber(registrationDto.getPhoneNumber());
            trainer.setEmail(registrationDto.getEmail());
            trainerRepository.save(trainer);
        } else {
            userRepository.save(user);
        }
        return user;
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

    public User getCurrentUser(String token) {
        String username = jwtService.extractUsername(token);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Cannot get user role"));
    }

    private Optional<User> getUser(String nickname) {
        return userRepository.findByUsername(nickname);
    }
}
