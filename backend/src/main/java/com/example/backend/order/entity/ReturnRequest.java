package com.example.backend.order.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "return_request")
@Data
public class ReturnRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderNumber;
    private String productCode;
    private String reason;
    private String customerName;
    private String phoneNumber;

    private LocalDateTime createdAt = LocalDateTime.now();
}