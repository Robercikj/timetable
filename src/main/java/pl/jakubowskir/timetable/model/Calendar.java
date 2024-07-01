package pl.jakubowskir.timetable.model;

import lombok.Getter;

import java.util.ArrayList;


@Getter
public class Calendar {
    public Calendar() {
        this.lessons = new ArrayList<>();
    }
    private final ArrayList<Lesson> lessons;

    public void addLesson(Lesson lesson) {
        lessons.add(lesson);
    }



}

