package pl.jakubowskir.timetable.trainer.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.trainer.model.Trainer;
import pl.jakubowskir.timetable.trainer.repository.TrainerRepository;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@AllArgsConstructor
public class TrainerController {

    private static final AtomicInteger counter = new AtomicInteger(0);

    private final TrainerRepository trainerRepository;

    @GetMapping("/api/v1/trainer")
    public List<Trainer> getTrainers() {
        return null;
    }
}
