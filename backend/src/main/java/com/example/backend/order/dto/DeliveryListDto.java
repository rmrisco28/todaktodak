package com.example.backend.order.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class DeliveryListDto {
    private Integer Id;
    private String deliveryNo;
    private String Name;
    private String deliveryTel;
    private Instant insertDttm;
    private Instant updateDttm;
    private String deliveryState;
    private Boolean useYn;
    private Boolean delYn;
}
