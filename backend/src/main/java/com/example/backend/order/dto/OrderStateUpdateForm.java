package com.example.backend.order.dto;

import lombok.Data;

@Data
public class OrderStateUpdateForm {
    private Integer seq;
    private String state;
    private String request;
    private String deliveryCompany;
    private String tracking;
}
