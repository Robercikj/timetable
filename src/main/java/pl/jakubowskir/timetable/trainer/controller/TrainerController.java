package pl.jakubowskir.timetable.trainer.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.trainer.model.Trainee;
import pl.jakubowskir.timetable.trainer.model.Trainer;
import pl.jakubowskir.timetable.trainer.repository.TrainerRepository;


import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/trainers")
public class TrainerController {
    private final TrainerService trainerService;
    private final TrainerRepository trainerRepository;

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

    @PostMapping("/{trainerId}/trainee") // dodawanie podopiecznego do konkretnego trenera po ID
    public ResponseEntity<String> addTraineeToTrainer(@PathVariable Long trainerId, @RequestBody Trainee trainee) {
        trainerService.addTraineeToTrainer(trainerId, trainee);
        return ResponseEntity.ok("Dodanow podopiecznego do trenera o numerze ID: " + trainerId);

    }

    @DeleteMapping("/trainers/{trainerId}")
    public ResponseEntity<String> deleteTrainer(@PathVariable Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId).orElse(null);
        if (trainer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trener o podanym ID nie istnieje: " + trainerId);
        } else {
            trainerRepository.delete(trainer);
            return ResponseEntity.ok("Usunięto trenera o podanym ID: " + trainerId);
        }
    }
}

