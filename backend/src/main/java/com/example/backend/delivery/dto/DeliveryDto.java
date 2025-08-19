package com.example.backend.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryDto {
    private Integer seq;
    private String code;
    private String name;
    private String callNo;
    private Boolean useYn;
}
