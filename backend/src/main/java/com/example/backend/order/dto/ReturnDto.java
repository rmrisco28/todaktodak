package com.example.backend.order.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReturnDto {
    private String name;
    private String email;
    private String phone;
    private String address;
    private String note;
    private LocalDateTime returnDate;
}
