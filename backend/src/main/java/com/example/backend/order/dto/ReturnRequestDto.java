package com.example.backend.order.dto;

import lombok.Data;

@Data
public class ReturnRequestDto {
    private String orderNumber;
    private String productCode;
    private String reason;
    private String customerName;
    private String phoneNumber;
}