package pl.jakubowskir.timetable.security;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private String username;
    private String password;
}
