package pl.jakubowskir.timetable.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.dto.LessonDto;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.service.LessonService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/lesson")
@AllArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @PostMapping
    public Lesson createLesson(@RequestBody LessonDto lessonDto) {
        return lessonService.createLesson(lessonDto);
    }

    @PutMapping("/{lessonId}/assignTrainee/{traineeId}")
    public Lesson asignTraineeToLesson(@PathVariable Long lessonId, @PathVariable Long traineeId) {
        return lessonService.assignTraineeToLesson(lessonId, traineeId);
    }
}
