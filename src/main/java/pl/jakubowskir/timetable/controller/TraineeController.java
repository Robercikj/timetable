package pl.jakubowskir.timetable.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.TraineeDto;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.service.TraineeService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/trainee")
@AllArgsConstructor
public class TraineeController {
    private TraineeService traineeService;

    // TODO: Wyswietl wszystkich podopiecznych



    @GetMapping
    public List<Trainee> getTrainee() {
        return traineeService.getTrainee();
    }

    // TODO: Wyswietl trenera ktory trenuje podopiecznego o podanym id

    @GetMapping("/{trainee_id}/get_trainer")
    public Trainer getTrainer(@PathVariable("trainee_id") Long traineeId){
        return traineeService.getTrainerByTraineeId(traineeId);
    }

    @PostMapping
    public Trainee addTrainee(@RequestBody TraineeDto traineeDto) {
        return traineeService.addTrainee(traineeDto);
    }

}

