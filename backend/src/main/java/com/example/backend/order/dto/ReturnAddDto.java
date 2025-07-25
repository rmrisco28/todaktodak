package com.example.backend.order.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Builder
public class ReturnAddDto {
    private Integer id;
    private String rentalNo;
    private String state;
    private String orderName;
    private String productNo;
    private String note;
    private LocalDateTime insertDttm;
    private LocalDateTime updateDttm;
}
