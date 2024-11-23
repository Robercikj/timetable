package pl.jakubowskir.timetable.security;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    TRAINEE,
    TRAINER,
    ADMIN;

    @Override
    public String getAuthority() {
        return this.toString();
    }
}
