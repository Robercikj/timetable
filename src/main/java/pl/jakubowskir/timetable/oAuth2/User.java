package pl.jakubowskir.timetable.oAuth2;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "timetable_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter

    private Long id;
    private String nickname;
    @Setter
    private String password;


    public void setNickname(String username) {
        this.nickname = nickname;
    }

}