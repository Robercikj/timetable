package pl.jakubowskir.timetable.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import pl.jakubowskir.timetable.dto.LessonDto;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.model.User;
import pl.jakubowskir.timetable.user.current.CurrentUser;
import pl.jakubowskir.timetable.service.LessonService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/timetable/lesson")
@AllArgsConstructor
@Slf4j
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
    public Lesson assignTraineeToLesson(@PathVariable Long lessonId, @CurrentUser User currentUser) {
        return lessonService.assignTraineeToLesson(lessonId, currentUser.getId());
    }

    @Secured({"ROLE_TRAINEE"})
    @PutMapping("/{lessonId}/opt_out")
    public Lesson unassignTraineeToLesson(@PathVariable Long lessonId, @CurrentUser User currentUser) {
        return lessonService.unassignTraineeToLesson(lessonId, currentUser.getId());
    }

    @Secured({"ROLE_TRAINER"})
    @PutMapping("/{lessonId}/cancel")
    public Lesson cancel(@PathVariable Long lessonId, @CurrentUser User currentUser) {
        return lessonService.cancelLesson(lessonId, currentUser.getId());
    }
}
