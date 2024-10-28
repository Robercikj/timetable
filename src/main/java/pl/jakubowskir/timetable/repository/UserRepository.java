package pl.jakubowskir.timetable.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.security.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String nickname);
    Optional<User> findByUsername(String nickname);

}

