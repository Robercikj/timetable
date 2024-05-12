package pl.jakubowskir.timetable.trainer.model;

import jakarta.persistence.*;

@Entity
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String surname;
    @Column
    private String email;
    @Column
    private int age;
    @Column
    private String phoneNumber;
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;
}
