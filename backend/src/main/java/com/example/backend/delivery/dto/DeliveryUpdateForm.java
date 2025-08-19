package com.example.backend.delivery.dto;

import lombok.Data;

@Data
public class DeliveryUpdateForm {
    private Integer seq;
    private String code;
    private String name;
    private String callNo;
}
