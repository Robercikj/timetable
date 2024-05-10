package pl.jakubowskir.timetable.trainer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pl.jakubowskir.timetable.trainer.model.Trainee;
import pl.jakubowskir.timetable.trainer.model.Trainer;
import pl.jakubowskir.timetable.trainer.repository.TrainerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;


@Service
public class TrainerService {
    private final TrainerRepository trainerRepository;
    private AtomicInteger counter;

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

    public void addTraineeToTrainer(Long trainerId, Trainee trainee) {
    }
}



