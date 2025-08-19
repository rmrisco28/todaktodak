package com.example.backend.delivery.dto;

import lombok.Data;

import java.util.List;

@Data
public class TrackingResponseDto {
    private String courierName;
    private String trackingNumber;
    private List<TrackingDetailDto> trackingDetails;
    // 그 외 필요한 정보 추가 가능 (예: isComplete)
}
