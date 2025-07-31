package com.example.backend.member.dto;

import java.time.LocalDateTime;

public interface MemberListInfo {
    // 회원목록폼
    Integer getSeq();

    String getMemberId();

    String getName();

    LocalDateTime getInsertDttm();

    Boolean getUseYn();

    Boolean getDelYn();

}
