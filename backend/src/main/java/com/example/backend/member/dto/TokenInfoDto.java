package com.example.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenInfoDto {
    private String memberId;
    private String name;
}
