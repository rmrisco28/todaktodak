package com.example.backend.member.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MemberDetailForm {
    // 회원상세보기폼
    private Integer seq;
    private String memberNo;
    private String memberId;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String phone;
    private String postCode;
    private String addr;
    private String addrDetail;
    private LocalDateTime insertDttm;
    private LocalDateTime updateDttm;
    private String state;
    private boolean useYn;
    private boolean delYn;

}
