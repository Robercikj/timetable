package pl.jakubowskir.timetable.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.dto.LessonDto;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.dto.TrainerDto;
import pl.jakubowskir.timetable.model.TrainerTraineeAssignment;
import pl.jakubowskir.timetable.service.LessonService;
import pl.jakubowskir.timetable.service.TrainerService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/trainer")
public class TrainerController {
    private TrainerService trainerService;

    @GetMapping("/assignments")
    public List<TrainerTraineeAssignment> getAssignments() {
        return trainerService.getAssignments();
    }
    @GetMapping("/trainers")
    public List<Trainer> getTrainers() {
        return trainerService.getTrainers();
    }

    @PostMapping("/add_trainer")
    public Trainer addTrainer(@RequestBody TrainerDto trainerDto) {
        return trainerService.addTrainer(trainerDto);
    }

    @PutMapping("/{trainerId}/add_trainee/{traineeId}") // dodawanie podopiecznego do konkretnego trenera po ID
    public Trainer addTraineeToTrainer(@PathVariable Long trainerId, @PathVariable Long traineeId) {
        return trainerService.addTraineeToTrainer(trainerId, traineeId);
    }

    @GetMapping("/{trainerId}/lessons")
    public List<Lesson> getAllTrainerLessons(@PathVariable Long trainerId) {
        return trainerService.getTrainerLessons(trainerId);
    }

}

