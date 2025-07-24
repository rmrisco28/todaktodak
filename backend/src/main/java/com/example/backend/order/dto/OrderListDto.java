package com.example.backend.order.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderListDto {
    private String odrName;
    private String orderState;
    private String orderOption;
    private Integer count;
    private Integer totalPrice;
    private LocalDateTime insertDttm;
    private LocalDateTime updateDttm;
}