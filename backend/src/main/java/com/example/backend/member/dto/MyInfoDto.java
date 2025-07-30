package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MyInfoDto {
    private String memberId;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String phone;
    private String postCode;
    private String addr;
    private String addrDetail;
}
