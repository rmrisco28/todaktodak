package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MemberDto {
    private String memberId;
    private String name;
    private String email;
    private LocalDate birthDt;
    private String phone;
    private String postCode;
    private String addr;
    private String addrDetail;
    private LocalDateTime insertDttm;

}
