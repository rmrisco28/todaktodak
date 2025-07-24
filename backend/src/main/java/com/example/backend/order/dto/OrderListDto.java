package com.example.backend.order.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderListDto {
    private Integer seq;
    private String orderNo;
    private String orderOption;
    private LocalDateTime orderDate;
}