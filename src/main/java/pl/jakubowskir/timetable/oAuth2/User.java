package pl.jakubowskir.timetable.oAuth2;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "timetable_user")
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter

    private Long id;
    @Setter
    @Getter
    private String nickname;
    @Setter
    @Getter
    private String password;

}