package com.example.backend.order.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name="receive")
public class Receive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_manage_seq")
    private OrderManage orderManage;

    private LocalDateTime receivedAt;

    private String receivedBy;

    private String memo;
}