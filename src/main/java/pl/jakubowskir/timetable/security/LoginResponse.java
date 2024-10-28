package pl.jakubowskir.timetable.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private long expiresIn;
    private String username;
}