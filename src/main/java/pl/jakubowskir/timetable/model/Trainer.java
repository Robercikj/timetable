package pl.jakubowskir.timetable.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trainer_id")
    private Long id;
    private String name;
    private String surname;
    private int phoneNumber;
    private String email;
    @OneToMany(mappedBy = "trainer")
    private List<Trainee> traineeList;

    // TODO: Dodaj email i numer telefonu
}
