package pl.jakubowskir.timetable.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.jakubowskir.timetable.security.User;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Trainee {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "trainee_id", referencedColumnName = "user_id")
    private User user;

    private String name;
    private String surname;
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;
    @ManyToMany(mappedBy = "trainees")
    private List<Lesson> lessons = new ArrayList<>();

}
