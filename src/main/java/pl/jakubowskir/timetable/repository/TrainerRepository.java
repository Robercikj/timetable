package pl.jakubowskir.timetable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.model.Trainer;


@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {}

