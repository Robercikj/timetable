package pl.jakubowskir.timetable.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.model.Lesson;


@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
