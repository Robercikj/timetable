package pl.jakubowskir.timetable.trainer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.trainee.Trainee;
import pl.jakubowskir.timetable.trainee.TraineeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class TrainerService {
    private final TrainerRepository trainerRepository;
    private final TraineeRepository traineeRepository;

    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
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








