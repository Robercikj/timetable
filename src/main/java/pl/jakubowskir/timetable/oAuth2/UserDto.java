package pl.jakubowskir.timetable.oAuth2;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {

    @Getter
    private String nickname;
    private String password;

    public UserDto(String password) {
        this.password = password;

    }
}
