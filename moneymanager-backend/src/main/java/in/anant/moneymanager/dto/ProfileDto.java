package in.anant.moneymanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {

    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String profileImageUrl;
    private LocalTime createdAt;
    private LocalTime updatedAt;
}
