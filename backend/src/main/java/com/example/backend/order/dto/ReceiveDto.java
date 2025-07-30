package com.example.backend.order.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReceiveDto {
    private Integer seq;
    private String productName;
    private String orderName;
    private String orderPhone;
    private String orderAddress;
    private Integer orderQuantity;
    private LocalDateTime orderDate;
}
