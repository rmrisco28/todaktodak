package com.example.backend.member.dto;

import java.time.LocalDateTime;

public interface MemberListInfo {
    String getSeq();

    String getMemberId();

    String getName();

    LocalDateTime getInsertDttm();

}
