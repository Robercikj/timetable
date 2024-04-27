package pl.jakubowskir.timetable.trainer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pl.jakubowskir.timetable.trainer.model.Trainer;
import pl.jakubowskir.timetable.trainer.repository.TrainerRepository;

@Service
public class TrainerService {
        private final TrainerRepository trainerRepository;
@Autowired
    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }
    public void addTrainer(TrainerDto trainerDto) {
    Trainer trainer = new Trainer();
    trainer.setName(trainer.getName());
    trainer.setSurname(trainer.getSurname());
    trainer.setId(trainer.getId());
        Trainer save = trainerRepository.save(trainer);
    }

}


