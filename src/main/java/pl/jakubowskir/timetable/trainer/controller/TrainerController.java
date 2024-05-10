package pl.jakubowskir.timetable.trainer.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.trainer.model.Trainee;
import pl.jakubowskir.timetable.trainer.model.Trainer;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/trainers")
public class TrainerController {


    private final TrainerService trainerService;



    @GetMapping("/api/v1/trainer")
    public List<Trainer> getTrainers() {
        return trainerService.getTrainers();
    }

    @PostMapping("/trainer")
    public ResponseEntity<String> addTrainer(@RequestBody TrainerDto trainerDto) {
        Trainer addedTrainer = trainerService.addTrainer(trainerDto);
        if (addedTrainer != null) {
            return ResponseEntity.ok("Dodano nowego trenera");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Błąd dodawania trenera");
        }
    }
    @PostMapping ("/{trainerId}/trainee") // dodawanie podopiecznego do konkretnego trenera po ID
    public ResponseEntity<String> addTraineeToTrainer(@PathVariable Long trainerId, @RequestBody Trainee trainee) {
        trainerService.addTraineeToTrainer(trainerId,trainee);
        return ResponseEntity.ok("Dodanow podopiecznego do trenera o numerze ID: " + trainerId);

    }

}
