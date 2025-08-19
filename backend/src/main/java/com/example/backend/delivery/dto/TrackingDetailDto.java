package com.example.backend.delivery.dto;

import lombok.Data;

@Data
public class TrackingDetailDto {
    private String timeString; // 처리 시간 (예: "2023-10-27 15:30")
    private String where;      // 현재 위치 (예: "서울 중랑콘솔Hub")
    private String kind;       // 처리 상태 (예: "간선상차")
    private String telno;      // 담당자 연락처
}
