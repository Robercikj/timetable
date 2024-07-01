package pl.jakubowskir.timetable.service;

import lombok.Getter;
import org.springframework.stereotype.Service;
import pl.jakubowskir.timetable.model.Lesson;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Service
public class CalendarService {
    private List<Lesson> lessons;
    public CalendarService() {
        lessons = new ArrayList<>();
    }
    public void addLesson(String opis, Date data) {
        lessons.add(new Lesson(opis, data));
    }
    public String formatLesson(Lesson lesson) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd HH:MM");
        return "Opis " + lesson.getOpis() + " , godzina " + dateFormat.format(lesson.getDate());
    }
}
//TODO: Dodaj metodę dodajTrening, która dodaje trening do listy.
