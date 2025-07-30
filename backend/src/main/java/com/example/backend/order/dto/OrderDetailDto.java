package com.example.backend.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderDetailDto {
    private Integer orderManageSeq;
    private String orderNo;
    private LocalDateTime orderDate;

    private List<String> productNames;
    private List<Integer> quantities;
    private List<Integer> prices;

    private int totalPrice;
    private String status;
    private String trackingNumber;
}
