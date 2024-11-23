package pl.jakubowskir.timetable.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.dto.LessonDto;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.Trainee;
import pl.jakubowskir.timetable.model.Trainer;
import pl.jakubowskir.timetable.repository.LessonRepository;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.repository.TrainerRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class LessonService {

    private LessonRepository lessonRepository;
    private TrainerRepository trainerRepository;
    private TraineeRepository traineeRepository;

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    @Transactional
    public Lesson assignTraineeToLesson(Long lessonId, Long traineeId) {
        log.info("DUPA");
        Trainee trainee = traineeRepository.findById(traineeId).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono podpoiecznego o podanym id " + traineeId)
        );
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(
                () -> new EntityNotFoundException("Nie znaleziono lekcji o podanym id " + lessonId)
        );
        if (trainee.getLessons().contains(lesson)) {
            return lesson;
        }
        if (lesson.getTrainer() == null || !lesson.getTrainer().equals(trainee.getTrainer())) {
            throw new RuntimeException("Robert chuj!");
        }
        if (lesson.getTrainees().size() >= lesson.getMaxCapacity()) {
            throw new RuntimeException("Max capacity reached!");
        }
        lesson.getTrainees().add(trainee);
        return lessonRepository.save(lesson);
    }

    @Transactional
    public Lesson createLesson(LessonDto lessonDto) {
        log.info(lessonDto.toString());
        if (lessonDto.startTime().isAfter(lessonDto.endTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        if (lessonDto.maxCapacity() <= 0) {
            throw new IllegalArgumentException("Max capacity must be greater than 0");
        }
        Trainer trainer = trainerRepository.findById(lessonDto.trainerId())
                .orElseThrow(() -> new RuntimeException("Trainer with id: %d not found"
                        .formatted(lessonDto.trainerId())));
        Lesson lesson = new Lesson();
        lesson.setTrainer(trainer);

        lesson.setTrainees(new ArrayList<>());
        lesson.setMaxCapacity(lessonDto.maxCapacity());
        lesson.setStartTime(lessonDto.startTime());
        lesson.setEndTime(lessonDto.endTime());
        if (trainer.getLessons().stream().anyMatch(lesson::doesLessonsIntersect)) {
            throw new RuntimeException("Lesson intersect with other trainer lessons");
        }
        return lessonRepository.save(lesson);
    }
}
