package com.example.backend.member.dto;

import lombok.Data;

@Data
public class MemberLoginForm {
    // 로그인폼
    private String memberId;
    private String password;
}
