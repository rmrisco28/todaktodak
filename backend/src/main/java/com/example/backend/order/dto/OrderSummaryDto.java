package com.example.backend.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OrderSummaryDto {
    private Integer orderId;
    private LocalDateTime orderDate;
    private String productNames;
    private int totalPrice;
    private String status;
    private String trackingNumber;
}