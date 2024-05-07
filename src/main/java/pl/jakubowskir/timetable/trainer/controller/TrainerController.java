package pl.jakubowskir.timetable.trainer.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.jakubowskir.timetable.trainer.model.Trainer;
import pl.jakubowskir.timetable.trainer.repository.TrainerRepository;

import java.util.List;

@RestController
@AllArgsConstructor
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
}
