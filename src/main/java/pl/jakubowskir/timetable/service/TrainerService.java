package pl.jakubowskir.timetable.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.dto.TrainerDto;
import pl.jakubowskir.timetable.model.TrainerTraineeAssignment;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.repository.TrainerRepository;
import pl.jakubowskir.timetable.security.Role;
import pl.jakubowskir.timetable.security.User;
import pl.jakubowskir.timetable.security.UserDto;
import pl.jakubowskir.timetable.security.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class TrainerService {
    private final TrainerRepository trainerRepository;
    private final TraineeRepository traineeRepository;
    private final UserService userService; // temporarily, until all trainers will be users

    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
    }

    public List<TrainerTraineeAssignment> getAssignments(){
        List<TrainerTraineeAssignment> assignments = new ArrayList<>();
        for (Trainer trainer : trainerRepository.findAll()){
            for(Trainee trainee : trainer.getTraineeList()){
                assignments.add(new TrainerTraineeAssignment(
                        trainer.getId(),
                        trainer.getName(),
                        trainee.getId(),
                        trainee.getName()

                ));
            }
        }
                return assignments;
    }

    public Trainer addTrainer(TrainerDto trainerDto) {
        Trainer trainer = new Trainer();
        trainer.setName(trainerDto.name());
        trainer.setSurname(trainerDto.surname());
        trainer.setPhoneNumber(trainerDto.phoneNumber());
        trainer.setEmail(trainerDto.email());
        trainer.setTraineeList(new ArrayList<>());
        // Temporarily add dummy user
        UserDto userDto = new UserDto();
        userDto.setUsername(trainerDto.name());
        userDto.setPassword(trainerDto.name());
        User user = userService.register(userDto, Role.TRAINER);
        trainer.setUser(user);
        return trainerRepository.save(trainer);
    }

    public Trainer addTraineeToTrainer(Long trainerId, Long traineeId) {
        Optional<Trainer> optionalTrainer = trainerRepository.findById(trainerId);
        if (optionalTrainer.isEmpty()) {
            throw new RuntimeException("Nie znaleziono trenera po Id" + trainerId);
        }
        Optional<Trainee> optionalTrainee = traineeRepository.findById(traineeId);
        if(optionalTrainee.isEmpty()) {
            throw new RuntimeException("Błąd dodawnaia");
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
}

