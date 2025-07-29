package com.example.backend.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OrderManageDto {
    private Integer seq;
    private String orderNo;
    private LocalDateTime orderDate;
    private String productNames;
    private Integer totalPrice;
    private String status;
    private String trackNo;
    private String delYn;
}
