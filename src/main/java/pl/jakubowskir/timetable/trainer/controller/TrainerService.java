package pl.jakubowskir.timetable.trainer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pl.jakubowskir.timetable.trainer.model.Trainer;
import pl.jakubowskir.timetable.trainer.repository.TrainerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static pl.jakubowskir.timetable.trainer.controller.TrainerController.counter;

@Service
public class TrainerService {
    private static final AtomicInteger counter = new AtomicInteger(0);
    private final TrainerRepository trainerRepository;
    public List<Trainer> getTrainers() {
            return trainerRepository.findAll();
    }

@Autowired
    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }
    public Trainer addTrainer(TrainerDto trainerDto) {
    Trainer trainer = new Trainer();
    trainer.setId((long) counter.getAndIncrement());
    trainer.setName(trainerDto.getName());
    trainer.setSurname(trainerDto.getSurname());
        return trainerRepository.save(trainer);


    }

}


