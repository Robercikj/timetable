package pl.jakubowskir.timetable.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.dto.TrainerDto;
import pl.jakubowskir.timetable.model.TrainerTraineeAssignment;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.repository.TrainerRepository;
import pl.jakubowskir.timetable.dto.RegistrationDto;
import pl.jakubowskir.timetable.model.Role;
import pl.jakubowskir.timetable.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class TrainerService {
    private final TrainerRepository trainerRepository;
    private final TraineeRepository traineeRepository;
    private final UserService userService;

    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
    }

    // Only for admin
    public Trainer addTrainer(TrainerDto trainerDto) {
        RegistrationDto userDto = new RegistrationDto();
        userDto.setUsername(UUID.randomUUID().toString());
        userDto.setPassword(UUID.randomUUID().toString());
        userDto.setFirstName(trainerDto.lastName());
        userDto.setLastName(trainerDto.lastName());
        userDto.setPhoneNumber(trainerDto.phoneNumber());
        userDto.setEmail(trainerDto.email());
        userDto.setRole(Role.TRAINER);
        User user = userService.register(userDto);
        user.setEnabled(false);
        return null;
    }

    public Trainer addTraineeToTrainer(Long trainerId, Long traineeId) {
        Optional<Trainer> optionalTrainer = trainerRepository.findById(trainerId);
        if (optionalTrainer.isEmpty()) {
            throw new RuntimeException("Trainer with given id not found: " + trainerId);
        }
        Optional<Trainee> optionalTrainee = traineeRepository.findById(traineeId);
        if(optionalTrainee.isEmpty()) {
            throw new RuntimeException("Error!");
        }
        Trainer trainer = optionalTrainer.get();
        Trainee trainee = optionalTrainee.get();
        trainee.setTrainer(trainer);
        traineeRepository.save(trainee);
        return trainer;
    }

    public List<Lesson> getTrainerLessons(Long trainerId) {
        return trainerRepository.findById(trainerId).map(Trainer::getLessons).orElse(List.of());
    }

    public List<Trainee> getTrainees(Long trainerId) {
        return traineeRepository.findAllByTrainerId(trainerId);
    }
}

