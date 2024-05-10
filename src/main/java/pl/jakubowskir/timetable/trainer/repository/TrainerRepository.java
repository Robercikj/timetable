package pl.jakubowskir.timetable.trainer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.trainer.model.Trainee;
import pl.jakubowskir.timetable.trainer.model.Trainer;

import java.util.List;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    void addTraineeToTrainer(Long trainerId, Trainee trainee);
}
