package pl.jakubowskir.timetable.oAuth2;


import pl.jakubowskir.timetable.repository.UserRepository;

public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;


    }
    public boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setNickname(userDto.getNickname());
        user.setPassword(userDto.getPassword());
        userRepository.save(user);
    }
}
