package com.example.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberListDto {
    private Integer seq;
    private String memberId;
    private String name;
    private LocalDateTime insertDttm;
    private Boolean useYn;
    private Boolean delYn;
}
