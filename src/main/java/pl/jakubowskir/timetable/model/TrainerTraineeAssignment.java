package pl.jakubowskir.timetable.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@AllArgsConstructor
public class TrainerTraineeAssignment {

    private Long trainerId;
    private String trainerName;
    private Long traineeId;
    private String traineeName;
}
