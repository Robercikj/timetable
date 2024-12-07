package pl.jakubowskir.timetable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.model.Trainee;

import java.util.List;

@Repository
public interface TraineeRepository extends JpaRepository<Trainee, Long> {

    List<Trainee> findAllByTrainerId(Long trainerId);
}

