package com.example.backend.order.dto;

import lombok.Data;

@Data
public class KakaoPayApproveResponse {
    private String aid;
    private String tid;
    private String paymentMethodType;
    private String itemName;
    private int quantity;
    private int amount;
}
