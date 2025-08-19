package com.example.backend.order.dto;

import lombok.Data;

@Data
public class KakaoPayRequest {
    private String itemName;
    private int quantity;
    private int totalAmount;
}
