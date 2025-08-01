package com.example.backend.member.dto;

import lombok.Data;

@Data
public class ChangePasswordForm {
    private String memberId;
    private String currentPassword;
    private String newPassword;
}