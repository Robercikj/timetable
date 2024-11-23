package pl.jakubowskir.timetable.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.repository.LessonRepository;
import pl.jakubowskir.timetable.repository.TraineeRepository;
import pl.jakubowskir.timetable.repository.TrainerRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LessonServiceTest {
    @Mock
    LessonRepository lessonRepository;
    @Mock
    TrainerRepository trainerRepository;
    @Mock
    TraineeRepository traineeRepository;


    @Test
    void getAllLessonsShouldReturnEmptyListWhenIsNotExistAnyLessons() {
        //Given
        LessonService lessonService = new LessonService(lessonRepository, trainerRepository, traineeRepository);
        when(lessonRepository.findAll()).thenReturn(new ArrayList<Lesson>());
        //when
        List<Lesson> lessons = lessonService.getAllLessons();
        //then
        assertNotNull(lessons);
    }
    @Test
    void getAllLessonsShouldReturnEmptyListWhenIsOneLesson() {
        //Given
        LessonService oneLesson = new LessonService(lessonRepository, trainerRepository, traineeRepository);
        when(lessonRepository.findAll()).thenReturn(List.of(new Lesson()));
        //when
        List<Lesson> lessons = oneLesson.getAllLessons();
        //then
        assertNotNull(lessons);
        assertEquals( 1, lessons.size());
    }
}