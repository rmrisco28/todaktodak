package com.example.backend.order.dto;

import lombok.Data;

@Data
public class ReceiveRequestDto {
    private Integer seq;
    private String memberNo;
    private String memo;
}