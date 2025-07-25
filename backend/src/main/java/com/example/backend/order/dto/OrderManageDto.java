package com.example.backend.order.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderManageDto {
    private Integer seq;
    private String orderNo;
    private String odrName;
    private String orderState;
    private String orderOption;
    private Integer count;
    private Integer totalProdPrice;
    private Integer deliveryFee;
    private Integer totalPrice;
    private String trackNo;
    private LocalDateTime insertDttm;
    private LocalDateTime updateDttm;
}
