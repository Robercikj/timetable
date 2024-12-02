package pl.jakubowskir.timetable.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationDto extends UserDto {
    private Role role;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
