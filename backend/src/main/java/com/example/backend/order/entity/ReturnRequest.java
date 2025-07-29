package com.example.backend.order.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "return_request")
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

    @ManyToOne
    @JoinColumn(name = "order_no", referencedColumnName = "order_no")
    private OrderManage orderNo;

    @Column(name = "product_no", length = 100)
    private String productNo;

    @ManyToOne
    @JoinColumn(name = "order_item_seq")
    private OrderItem orderItemSeq;

}