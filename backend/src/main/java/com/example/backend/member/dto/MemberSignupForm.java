package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberSignupForm {
    // 회원가입폼
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