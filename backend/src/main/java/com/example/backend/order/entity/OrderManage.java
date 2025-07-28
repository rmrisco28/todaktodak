package com.example.backend.order.entity;

import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "OrderManage")
@Getter
@Setter
public class OrderManage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @Column(name = "order_no")
    private String orderNo;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "orderManage", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();
}