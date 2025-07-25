package com.example.backend.order.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class ReturnAddDto {
    private String productNo;
    private String memberNo;
    private String odrName;
    private LocalDate rentalDate;
    private Integer count;
    private LocalDateTime insertDttn;
    private String state;
}
