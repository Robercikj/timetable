package pl.jakubowskir.timetable.configuration;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import pl.jakubowskir.timetable.dto.LessonDto;
import pl.jakubowskir.timetable.security.RegistrationDto;
import pl.jakubowskir.timetable.security.Role;
import pl.jakubowskir.timetable.security.UserService;
import pl.jakubowskir.timetable.service.LessonService;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
@Slf4j
public class StartValues {

    private final UserService userService;
    private final LessonService lessonService;

    @PostConstruct
    public void createUsersAtStartup() {
        log.info("Creating test startup users");
        RegistrationDto adminDto = new RegistrationDto();
        adminDto.setUsername("admin");
        adminDto.setPassword("admin");
        adminDto.setRole(Role.ADMIN);
        userService.register(adminDto);
        log.info("ADMIN");
        RegistrationDto traineeDto = new RegistrationDto();
        traineeDto.setUsername("trainee");
        traineeDto.setPassword("trainee");
        traineeDto.setRole(Role.TRAINEE);
        traineeDto.setEmail("trainee@email.com");
        traineeDto.setFirstName("Trainee");
        traineeDto.setLastName("Nice");
        traineeDto.setPhoneNumber("123");
        userService.register(traineeDto);
        log.info("TRAINEE");
        RegistrationDto trainerDto = new RegistrationDto();
        trainerDto.setUsername("trainer");
        trainerDto.setPassword("trainer");
        trainerDto.setRole(Role.TRAINER);
        trainerDto.setEmail("trainer@email.com");
        trainerDto.setFirstName("Trainer");
        trainerDto.setLastName("Cute");
        trainerDto.setPhoneNumber("1234");
        userService.register(trainerDto);
        log.info("TRAINER");

        LessonDto lessonDto = new LessonDto(
                LocalDateTime.now().plusHours(1),
                LocalDateTime.now().plusHours(2),
                10
        );
        LessonDto lessonDto2 = new LessonDto(
                LocalDateTime.now().plusHours(3),
                LocalDateTime.now().plusHours(4),
                2
        );
        lessonService.createLesson(3L, lessonDto);
        lessonService.createLesson(3L, lessonDto2);
    }
}
