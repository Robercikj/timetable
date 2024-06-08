package pl.jakubowskir.timetable.trainer;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/trainer")
public class TrainerController {
    private TrainerService trainerService;

    @GetMapping
    public List<Trainer> getTrainers() {
        return trainerService.getTrainers();
    }

    @PostMapping
    public Trainer addTrainer(@RequestBody TrainerDto trainerDto) {
        return trainerService.addTrainer(trainerDto);
    }

    @PutMapping("/{trainerId}/add_trainee/{traineeId}") // dodawanie podopiecznego do konkretnego trenera po ID
    public Trainer addTraineeToTrainer(@PathVariable Long trainerId, @PathVariable Long traineeId) {
        return trainerService.addTraineeToTrainer(trainerId, traineeId);
    }
}




//("/{trainerId}/add_trainee/{traineeId}")