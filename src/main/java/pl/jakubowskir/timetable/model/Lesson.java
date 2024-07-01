package pl.jakubowskir.timetable.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Setter
@Getter
@ToString

public class Lesson {
    private String opis;
    private Date date;

    public Lesson(String opis, Date data) {
        this.opis = opis;
        this.date = data;
    }
}


