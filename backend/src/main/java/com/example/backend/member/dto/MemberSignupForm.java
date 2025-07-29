package com.example.backend.member.dto;

import lombok.Data;

@Data
public class MemberSignupForm {
    // 회원가입폼
    private String memberId;
    private String password;
    private String name;
    private String phone;
    private String birthDate;
    private String email;
    private String addr;
    private String addrDetail;
    private String postCode;
}