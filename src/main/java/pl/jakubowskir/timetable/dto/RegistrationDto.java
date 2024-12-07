package pl.jakubowskir.timetable.dto;

import lombok.Getter;
import lombok.Setter;
import pl.jakubowskir.timetable.model.Role;

@Getter
@Setter
public class RegistrationDto extends UserDto {
    private Role role;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
