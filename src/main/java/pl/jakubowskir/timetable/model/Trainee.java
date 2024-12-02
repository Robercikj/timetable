package pl.jakubowskir.timetable.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
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

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "trainee_id", referencedColumnName = "user_id")
    private User user;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;
    @ManyToMany(mappedBy = "trainees")
    private List<Lesson> lessons = new ArrayList<>();

}
