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
import pl.jakubowskir.timetable.model.Role;
import pl.jakubowskir.timetable.model.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    public List<Lesson> getUpcomingTrainerLessons(User currentUser) {
        if (Role.TRAINER == currentUser.getRole()) {
            return lessonRepository.findAllByTrainerIdAndStartTimeAfterAndCanceledFalse(currentUser.getId(),
                    LocalDateTime.now());
        } else if (Role.TRAINEE == currentUser.getRole()) {
            Trainee trainee = traineeRepository.findById(currentUser.getId()).orElseThrow(
                    () -> new EntityNotFoundException("Trainee with id " + currentUser.getId() + " not found")
            );
            if (trainee.getTrainer() == null) {
                return List.of();
            }
            return lessonRepository.findAllByTrainerIdAndStartTimeAfterAndCanceledFalse(trainee.getTrainer().getId(),
                    LocalDateTime.now());
        }
        return List.of();
    }

    public List<Lesson> getAllTrainerLessons(Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId).orElseThrow(
                () -> new EntityNotFoundException("Trainee with id " + trainerId + " not found")
        );
        return trainer.getLessons().stream().filter(lesson -> !lesson.isCanceled()).toList();
    }

    public List<Lesson> getUpcomingTraineeLessons(User currentUser) {
        if (Role.TRAINEE != currentUser.getRole()) {
            return List.of();
        }
        Trainee trainee = traineeRepository.findById(currentUser.getId()).orElseThrow(
                () -> new EntityNotFoundException("Trainee with id " + currentUser.getId() + " not found")
        );
        return trainee.getLessons().stream().filter(lesson -> lesson.getStartTime().isAfter(LocalDateTime.now()))
                .filter(lesson -> !lesson.isCanceled()).toList();
    }

    @Transactional
    public Lesson assignTraineeToLesson(Long lessonId, Long traineeId) {
        Trainee trainee = traineeRepository.findById(traineeId).orElseThrow(
                () -> new EntityNotFoundException("Trainee with the given id not found: " + traineeId)
        );
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(
                () -> new EntityNotFoundException("Lesson with the given id not found: " + lessonId)
        );
        if (trainee.getLessons().contains(lesson)) {
            return lesson;
        }
        if (lesson.getTrainer() == null || !lesson.getTrainer().equals(trainee.getTrainer())) {
            throw new RuntimeException("Error!");
        }
        if (lesson.getTrainees().size() > lesson.getRemainingCapacity()) {
            throw new RuntimeException("Max capacity reached!");
        }
        lesson.getTrainees().add(trainee);
        lesson.setRemainingCapacity(lesson.getRemainingCapacity() - 1);
        return lessonRepository.save(lesson);
    }

    @Transactional
    public Lesson unassignTraineeToLesson(Long lessonId, Long traineeId) {
        Trainee trainee = traineeRepository.findById(traineeId).orElseThrow(
                () -> new EntityNotFoundException("Trainee with the given id not found: " + traineeId)
        );
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(
                () -> new EntityNotFoundException("Lesson with the given id not found: " + lessonId)
        );
        lesson.getTrainees().remove(trainee);
        lesson.setRemainingCapacity(lesson.getRemainingCapacity() + 1);
        return lessonRepository.save(lesson);
    }

    @Transactional
    public Lesson createLesson(Long trainerId, LessonDto lessonDto) {
        log.info(lessonDto.toString());
        if (lessonDto.startTime().isAfter(lessonDto.endTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        if (lessonDto.maxCapacity() <= 0) {
            throw new IllegalArgumentException("Max capacity must be greater than 0");
        }
        Trainer trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer with id: %d not found"
                        .formatted(trainerId)));
        Lesson lesson = new Lesson();
        lesson.setTrainer(trainer);

        lesson.setTrainees(new ArrayList<>());
        lesson.setRemainingCapacity(lessonDto.maxCapacity());
        lesson.setStartTime(lessonDto.startTime());
        lesson.setEndTime(lessonDto.endTime());
        if (trainer.getLessons().stream().anyMatch(lesson::doesLessonsIntersect)) {
            throw new RuntimeException("Lesson intersect with other trainer lessons");
        }
        return lessonRepository.save(lesson);
    }

    @Transactional
    public Lesson cancelLesson(Long lessonId, Long userId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(
                () -> new EntityNotFoundException("Lesson with id " + lessonId + " not found")
        );
        if (!Objects.equals(lesson.getTrainer().getId(), userId)) {
            throw new RuntimeException("Lesson with id " + lessonId + " not cancelled. Invalid request");
        }
        lesson.setCanceled(true);
        return lessonRepository.save(lesson);
    }
}
