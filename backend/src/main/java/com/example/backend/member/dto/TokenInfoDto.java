package com.example.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenInfoDto {
    //토큰 경로 dto
    private String memberId;
    private String name;
}
