package pl.jakubowskir.timetable.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jakubowskir.timetable.oAuth2.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByNickname(String nickname);
    Optional<User> findByNickname(String nickname);

}

