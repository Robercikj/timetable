package pl.jakubowskir.timetable.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.dto.TraineeDto;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.dto.RegistrationDto;
import pl.jakubowskir.timetable.model.Role;
import pl.jakubowskir.timetable.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TraineeService {

    private TraineeRepository traineeRepository;
    private UserService userService;

    // Only for admin
    public Trainee addTrainee(TraineeDto trainerDto) {
        RegistrationDto registrationDto = new RegistrationDto();
        registrationDto.setUsername(UUID.randomUUID().toString());
        registrationDto.setPassword(UUID.randomUUID().toString());
        registrationDto.setFirstName(trainerDto.firstName());
        registrationDto.setLastName(trainerDto.lastName());
        registrationDto.setEmail(trainerDto.email());
        registrationDto.setPhoneNumber(trainerDto.phoneNumber());
        registrationDto.setRole(Role.TRAINEE);
        User user = userService.register(registrationDto);
        user.setEnabled(false);
        return null;
    }

    public List<Trainee> getTrainee() {
        return traineeRepository.findAll();
    }

    public List<Trainee> getTraineeWithoutTrainer() {
        return traineeRepository.findAllByTrainerId(null);
    }

    public Trainer getTrainerByTraineeId(Long traineeId) {
        Optional<Trainee> optionalTrainee = traineeRepository.findById(traineeId);
        if (optionalTrainee.isPresent()) {
            Trainee trainee = optionalTrainee.get();
            return trainee.getTrainer();
        } else {
            throw new EntityNotFoundException("Trainee with given id not found: " + traineeId);
        }
    }

    public List<Lesson> getTrainerAvailableLessons(Long traineeId) {
        Trainee trainee = traineeRepository.findById(traineeId).orElseThrow(
                () -> new EntityNotFoundException("Trainee with given id not found: " + traineeId)
        );
        Trainer trainer = trainee.getTrainer();
        if (trainer == null) {
            throw new IllegalStateException("Trainee doesn't have trainer yet!");
        }
        return trainer.getLessons();
    }

    public List<Lesson> getTraineeLessons(Long traineeId) {
        return traineeRepository.findById(traineeId).map(Trainee::getLessons).orElseThrow(
                () -> new EntityNotFoundException("Trainee with given id not found: " + traineeId)
        );
    }
}
