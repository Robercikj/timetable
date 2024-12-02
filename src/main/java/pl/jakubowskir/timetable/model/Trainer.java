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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trainer {

    @Id
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "trainer_id", referencedColumnName = "user_id")
    private User user;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    @OneToMany(mappedBy = "trainer")
    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    private List<Trainee> traineeList;
    @OneToMany(mappedBy = "trainer")
    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    private List<Lesson> lessons = new ArrayList<>();

}
