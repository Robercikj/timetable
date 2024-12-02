package pl.jakubowskir.timetable.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.dto.TraineeDto;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.security.User;
import pl.jakubowskir.timetable.security.current_user.CurrentUser;
import pl.jakubowskir.timetable.service.TraineeService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/timetable/trainee")
@AllArgsConstructor
public class TraineeController {
    private TraineeService traineeService;

    // TODO: Wyswietl wszystkich podopiecznych

    @Secured({"ROLE_TRAINER", "ROLE_TRAINEE", "ROLE_ADMIN"})
    @GetMapping("/all")
    public List<Trainee> getTrainee() {
        return traineeService.getTrainee();
    }

    // TODO: Wyswietl trenera ktory trenuje podopiecznego o podanym id
    @Secured({"ROLE_TRAINER", "ROLE_ADMIN"})
    @GetMapping("/{trainee_id}/get_trainer")
    public Trainer getTrainer(@PathVariable("trainee_id") Long traineeId) {
        return traineeService.getTrainerByTraineeId(traineeId);
    }

    @Secured({"ROLE_TRAINEE"})
    @GetMapping("/get_trainer")
    public Trainer getCurrentUserTrainer(@CurrentUser User currentUser) {
        return traineeService.getTrainerByTraineeId(currentUser.getId());
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/add_trainees")
    public Trainee addTrainee(@RequestBody TraineeDto traineeDto) {
        return traineeService.addTrainee(traineeDto);
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/{trainee_id}/trainer_available_lessons")
    public List<Lesson> getTrainerAvailableLessons(@PathVariable("trainee_id") Long traineeId) {
        return traineeService.getTrainerAvailableLessons(traineeId);
    }

    @Secured({"ROLE_TRAINEE"})
    @GetMapping("/trainer_available_lessons")
    public List<Lesson> getTrainerAvailableLessons(@CurrentUser User currentUser) {
        return traineeService.getTrainerAvailableLessons(currentUser.getId());
    }


    @Secured({"ROLE_TRAINER", "ROLE_ADMIN"})
    @GetMapping("/{trainee_id}/lessons")
    public List<Lesson> getLessons(@PathVariable("trainee_id") Long traineeId) {
        return traineeService.getTraineeLessons(traineeId);
    }

    @Secured({"ROLE_TRAINEE", "ROLE_ADMIN"})
    @GetMapping("/lessons")
    public List<Lesson> getCurrentUserLessons(@CurrentUser User currentUser) {
        return traineeService.getTraineeLessons(currentUser.getId());
    }

}

