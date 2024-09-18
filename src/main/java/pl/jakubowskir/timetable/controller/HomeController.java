package pl.jakubowskir.timetable.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public ResponseEntity<String> getHome() {
        return ResponseEntity.ok("Welcome to the homepage!");
    }
}
