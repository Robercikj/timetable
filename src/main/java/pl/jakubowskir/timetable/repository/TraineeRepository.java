package pl.jakubowskir.timetable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jakubowskir.timetable.model.Trainee;

public interface TraineeRepository extends JpaRepository<Trainee, Long> {
}

