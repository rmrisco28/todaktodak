package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberAddForm {
    // 회원등록폼
    private String auth;
    private String memberId;
    private String password;
    private String name;
    private String phone;
    private LocalDate birthDate;
    private String email;
    private String addr;
    private String addrDetail;
    private String postCode;
}
