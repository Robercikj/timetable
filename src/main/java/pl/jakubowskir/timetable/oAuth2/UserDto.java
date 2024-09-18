package pl.jakubowskir.timetable.oAuth2;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private String nickname;
    private String password;
}
