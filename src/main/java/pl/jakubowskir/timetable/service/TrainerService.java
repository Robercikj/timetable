package pl.jakubowskir.timetable.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.model.TrainerDto;
import pl.jakubowskir.timetable.model.TrainerTraineeAssignment;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.repository.TrainerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class      TrainerService {
    private final TrainerRepository trainerRepository;
    private final TraineeRepository traineeRepository;
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

    @Autowired
    public TrainerService(TrainerRepository trainerRepository, TraineeRepository traineeRepository) {
        this.trainerRepository = trainerRepository;
        this.traineeRepository = traineeRepository;
    }

    public Trainer addTrainer(TrainerDto trainerDto) {
        Trainer trainer = new Trainer();
        trainer.setName(trainerDto.name());
        trainer.setSurname(trainerDto.surname());
        trainer.setPhoneNumber(trainerDto.phoneNumber());
        trainer.setEmail(trainerDto.email());
        trainer.setTraineeList(new ArrayList<>());
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
}

