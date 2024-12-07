package pl.jakubowskir.timetable.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @JsonIgnore
    private List<Trainee> traineeList;
    @OneToMany(mappedBy = "trainer")
    @JsonIgnore
    private List<Lesson> lessons = new ArrayList<>();

}
