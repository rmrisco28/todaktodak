package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MyInfoDto {
    // 내정보보기폼
    private String memberId;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String phone;
    private String postCode;
    private String addr;
    private String addrDetail;
}
