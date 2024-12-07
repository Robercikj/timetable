package pl.jakubowskir.timetable.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.dto.TrainerDto;
import pl.jakubowskir.timetable.model.User;
import pl.jakubowskir.timetable.user.current.CurrentUser;
import pl.jakubowskir.timetable.service.TrainerService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/timetable/trainer")
@Slf4j
public class TrainerController {
    private TrainerService trainerService;

    @Secured({"ROLE_TRAINER", "ROLE_TRAINEE", "ROLE_ADMIN"})
    @GetMapping("/all")
    public List<Trainer> getTrainers() {
        return trainerService.getTrainers();
    }

    @PostMapping("/add_trainer")
    @Secured("ROLE_ADMIN")
    public Trainer addTrainer(@RequestBody TrainerDto trainerDto) {
        return trainerService.addTrainer(trainerDto);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/{trainerId}/add_trainee/{traineeId}")
    public Trainer addTraineeToTrainerWithGivenTrainerId(@PathVariable Long trainerId, @PathVariable Long traineeId) {
        return trainerService.addTraineeToTrainer(trainerId, traineeId);
    }

    @Secured("ROLE_TRAINER")
    @PutMapping("add_trainee/{traineeId}")
    public Trainer addTraineeToCurrentTrainer(@CurrentUser User currentUser, @PathVariable Long traineeId) {
        return trainerService.addTraineeToTrainer(currentUser.getId(), traineeId);
    }

    @Secured("ROLE_TRAINEE")
    @PutMapping("/{trainerId}/add_current_trainee")
    public Trainer addCurrentTraineeToTheGivenTrainer(@CurrentUser User currentUser, @PathVariable Long trainerId) {
        return trainerService.addTraineeToTrainer(trainerId, currentUser.getId());
    }

    @Secured({"ROLE_TRAINER", "ROLE_TRAINEE", "ROLE_ADMIN"})
    @GetMapping("/{trainerId}/lessons")
    public List<Lesson> getAllTrainerLessons(@PathVariable Long trainerId) {
        return trainerService.getTrainerLessons(trainerId);
    }

    @Secured("ROLE_TRAINER")
    @GetMapping("/trainees")
    public List<Trainee> getAllTrainees(@CurrentUser User user) {
        return trainerService.getTrainees(user.getId());
    }
}

