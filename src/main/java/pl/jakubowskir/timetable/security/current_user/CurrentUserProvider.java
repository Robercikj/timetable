package pl.jakubowskir.timetable.security.current_user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.jakubowskir.timetable.security.User;

@Component
@Slf4j
public class CurrentUserProvider {

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.error(authentication.getPrincipal().toString());
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }
        throw new IllegalStateException("No authenticated user found");
    }
}
