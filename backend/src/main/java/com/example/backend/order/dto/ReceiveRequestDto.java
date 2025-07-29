package com.example.backend.order.dto;

import lombok.Data;

@Data
public class ReceiveRequestDto {
    private Integer orderManageSeq;
    private String receivedBy;
    private String memo;
}