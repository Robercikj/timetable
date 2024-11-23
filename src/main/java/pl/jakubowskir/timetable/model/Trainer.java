package pl.jakubowskir.timetable.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Trainer {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "trainer_id", referencedColumnName = "user_id")
    private User user;

    private String name;
    private String surname;
    private int phoneNumber;
    private String email;
    @OneToMany(mappedBy = "trainer")
    private List<Trainee> traineeList;
    @OneToMany(mappedBy = "trainer")
    private List<Lesson> lessons = new ArrayList<>();

}
