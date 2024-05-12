package pl.jakubowskir.timetable.trainer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pl.jakubowskir.timetable.trainer.model.Trainee;
import pl.jakubowskir.timetable.trainer.model.Trainer;
import pl.jakubowskir.timetable.trainer.repository.TrainerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;


@Service
public class
TrainerService {
    public TrainerRepository trainerRepository;

    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
    }

    @Autowired
    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    public Trainer addTrainer(TrainerDto trainerDto) {
        Trainer trainer = new Trainer();
        trainer.setName(trainerDto.name());
        trainer.setSurname(trainerDto.surname());
        return trainerRepository.save(trainer);


    }
    public void Trainer addTraineeToTrainer(Long trainerId, Trainee trainee) {
        Optional<Trainer> optionalTrainer = trainerRepository.findById(trainerId);
        if (optionalTrainer.isPresent()) {
            Trainer trainer = optionalTrainer.get();
            trainer.getTrainees().add(trainee);
            trainerRepository.save(trainer);
        } else {
            throw new IllegalArgumentException("Nie znaleziono trenera po Id" + trainerId);
        }

        // public void addTraineeToTrainer(Long trainerId, Trainee trainee) {
        //}
    }
}





