package pl.jakubowskir.timetable.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.dto.TraineeDto;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.repository.TrainerRepository;
import pl.jakubowskir.timetable.security.Role;
import pl.jakubowskir.timetable.security.User;
import pl.jakubowskir.timetable.security.UserDto;
import pl.jakubowskir.timetable.security.UserService;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TraineeService {

    private TraineeRepository traineeRepository;
    private UserService userService;

    public Trainee addTrainee(TraineeDto trainerDto) {
        Trainee trainee = new Trainee();
        trainee.setName(trainerDto.name());
        trainee.setSurname(trainerDto.surname());
        // Temporarily add dummy user
        UserDto userDto = new UserDto();
        userDto.setUsername(trainerDto.name());
        userDto.setPassword(trainerDto.name());
        User user = userService.register(userDto, Role.TRAINEE);
        trainee.setUser(user);
        return traineeRepository.save(trainee);
    }

    public List<Trainee> getTrainee() {
        return traineeRepository.findAll();
    }


    public Trainer getTrainerByTraineeId(Long traineeId) {
        Optional<Trainee> optionalTrainee = traineeRepository.findById(traineeId);
        if (optionalTrainee.isPresent()) {
            Trainee trainee = optionalTrainee.get();
            return trainee.getTrainer();
        } else {
            throw new EntityNotFoundException("Nie znaleziono podpoiecznego o podanym id " + traineeId);
        }
    }

    public List<Lesson> getTrainerAvailableLessons(Long traineeId) {
        Trainee trainee = traineeRepository.findById(traineeId).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono podpoiecznego o podanym id " + traineeId)
        );
        Trainer trainer = trainee.getTrainer();
        if (trainer == null) {
            throw new IllegalStateException("Trainee doesn't have trainer yet!");
        }
        return trainer.getLessons();
    }

    public List<Lesson> getTraineeLessons(Long traineeId) {
        return traineeRepository.findById(traineeId).map(Trainee::getLessons).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono podpoiecznego o podanym id " + traineeId)
        );
    }
}
