package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MemberForm {
    private String memberId;
    private String password;
    private String name;
    private String phone;
    private String birthDate;
    private String email;
    private String addr;
    private String addrDetail;
    private String postcode;
}