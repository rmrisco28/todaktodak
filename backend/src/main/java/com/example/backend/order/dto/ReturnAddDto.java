package com.example.backend.order.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class ReturnAddDto {
    private String rentalNo;
    private String state;
    private String odrName;
    private String productName;
    private String note;
    private Instant insertDttm;
    private Instant updateDttm;
}
