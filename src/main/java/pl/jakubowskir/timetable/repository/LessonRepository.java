package pl.jakubowskir.timetable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.model.Lesson;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findAllByTrainerIdAndStartTimeAfter(Long trainerId, LocalDateTime startTime);
}
