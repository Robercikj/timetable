package pl.jakubowskir.timetable.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.TraineeDto;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.repository.TraineeRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TraineeService {

    private TraineeRepository traineeRepository;

    public Trainee addTrainee(TraineeDto trainerDto) {
        Trainee trainee = new Trainee();
        trainee.setName(trainerDto.name());
        trainee.setSurname(trainerDto.surname());
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
}
