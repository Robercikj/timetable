package pl.jakubowskir.timetable.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trainee_id")
    private Long id;
    private String name;
    private String surname;
    @Getter
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

}
