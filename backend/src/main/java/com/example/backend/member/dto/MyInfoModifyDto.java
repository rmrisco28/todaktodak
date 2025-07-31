package com.example.backend.member.dto;

import lombok.Data;

@Data
public class MyInfoModifyDto {
    private String memberId;
    private String name;
    private String email;
    private String birthDate;
    private String phone;
    private String postCode;
    private String addr;
    private String addrDetail;
}
