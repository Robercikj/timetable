package pl.jakubowskir.timetable.trainer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.trainer.Trainer;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {}
