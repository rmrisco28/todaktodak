package com.example.backend.order.dto;

import lombok.Data;

@Data
public class ReturnRequestDto {
    private String orderNo;
    private String productNo;
    private String reason;
    private String customerName;
    private String phone;
}