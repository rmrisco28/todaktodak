package com.example.backend.order.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReceiveResponseDto {
    private String productName;
    private String address;
    private String status;
    private String orderDate;
    private LocalDateTime receivedAt;
    private String memberNo;
    private String memo;
}
