package com.example.backend.order.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReceiveDto {
    private Integer productId;
    private String productName;
    private String orderName;
    private String orderPhone;
    private String orderAddress;
    private Integer orderQuantity;
    private LocalDateTime orderDate;
}
