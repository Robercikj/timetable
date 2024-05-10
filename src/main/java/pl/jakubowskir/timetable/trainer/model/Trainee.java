package pl.jakubowskir.timetable.trainer.model;

import jakarta.persistence.*;

@Entity
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "(VARCHAR(250)")
    private String name;
    @Column(columnDefinition = "(VARCHAR(250)")
    private String surname;
    @Column(columnDefinition = "(VARCHAR(250)")
    private String email;
    @Column
    private int age;
    @Column
    private int phoneNumber;
}
