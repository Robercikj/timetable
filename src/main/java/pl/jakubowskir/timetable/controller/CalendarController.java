package pl.jakubowskir.timetable.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jakubowskir.timetable.model.Lesson;
import pl.jakubowskir.timetable.service.CalendarService;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Scanner;
@RestController
@RequestMapping("/api/Calendar")
public class CalendarController {
    private final CalendarService calendarService;
    @Autowired
    public CalendarController() { calendarService = new CalendarService();}


    public static void main(String[] args) {
        CalendarController controller = new CalendarController();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("1. Dodaj zajęcia. ");
            System.out.println("2. Wyświetl zajęcia. ");
            System.out.println("3. koniec");


            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.println("Podaj date i godzine treningu((RRRR-MM-DD HH:MM)");
                    String dataString = scanner.nextLine();
                    System.out.println("Podaj opis ");
                    String opis = scanner.nextLine();

                    Date data;
                    try {
                        data = Timestamp.valueOf(dataString);
                    } catch (IllegalArgumentException e) {
                        System.out.println("Zy format daty ");
                        break;
                    }
                    controller.addLesson(data, opis);
                    break;
                case 2:

                    controller.getLessons();
                    break;
                case 3:
                    System.out.println("Exit");
                    System.exit(0);
                default:
                    System.out.println("nieprawidłowy wybór");
                    break;

            }
        }
    }
    @GetMapping("/lessons")
    private void getLessons() {
        for (Lesson lesson : calendarService.getLessons()) {
            System.out.println("zajecia: " + calendarService.formatLesson(lesson));
        }
    }
    @PostMapping("/lesson")
    private void addLesson(Date data, String opis) {
        calendarService.addLesson(opis, data);
        System.out.println("Zajęcia dodane : " + opis + " o godzi " + data);
    }
}

