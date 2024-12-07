package pl.jakubowskir.timetable.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import pl.jakubowskir.timetable.model.Role;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private long expiresIn;
    private String username;
    private Role role;
}