package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MyInfoModifyDto {
    // 내정보변경폼
    private String memberId;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String phone;
    private String postCode;
    private String addr;
    private String addrDetail;
    private LocalDateTime updateDttm;
}
