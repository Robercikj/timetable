package pl.jakubowskir.timetable.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.dto.LessonDto;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.security.User;
import pl.jakubowskir.timetable.security.current_user.CurrentUser;
import pl.jakubowskir.timetable.service.LessonService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/timetable/lesson")
@AllArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @Secured({"ROLE_TRAINER", "ROLE_TRAINEE"})
    @GetMapping("/upcoming/trainer")
    public List<Lesson> getUpcomingTrainerLessons(@CurrentUser User currentUser) {
        return lessonService.getUpcomingTrainerLessons(currentUser);
    }

    @Secured({"ROLE_TRAINEE"})
    @GetMapping("/upcoming/trainee")
    public List<Lesson> getUpcomingTraineeLessons(@CurrentUser User currentUser) {
        return lessonService.getUpcomingTraineeLessons(currentUser);
    }
    @Secured({"ROLE_TRAINER"})
    @GetMapping("/all/trainer")
    public List<Lesson> getAllTrainerLessons(@CurrentUser User currentUser) {
        return lessonService.getAllTrainerLessons(currentUser.getId());
    }


    @Secured({"ROLE_TRAINER"})
    @PostMapping
    public Lesson createLesson(@CurrentUser User currentUser, @RequestBody LessonDto lessonDto) {
        return lessonService.createLesson(currentUser.getId(), lessonDto);
    }

    @Secured({"ROLE_TRAINEE"})
    @PutMapping("/{lessonId}/enroll")
    public Lesson asignTraineeToLesson(@PathVariable Long lessonId, @CurrentUser User currentUser) {
        return lessonService.assignTraineeToLesson(lessonId, currentUser.getId());
    }
}
