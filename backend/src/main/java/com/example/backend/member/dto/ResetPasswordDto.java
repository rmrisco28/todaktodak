package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResetPasswordDto {
    private String memberId;
    private String email;
    private String newPassword;
    private LocalDateTime updateDttm;
}
