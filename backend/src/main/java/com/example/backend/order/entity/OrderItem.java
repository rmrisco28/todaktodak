package com.example.backend.order.entity;

import com.example.backend.product.entity.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "order_items") // ✅ 매핑될 테이블명
@Getter
@Setter
@ToString
public class OrderItem {

    // ✅ PK: 주문 상품 항목의 고유 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    // ✅ 해당 상품의 주문 수량
    private Integer quantity;

    // ✅ 주문 정보와의 관계 (N:1)
    // order_items.order_no → order_manage.order_no
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_no", referencedColumnName = "order_no")
    private OrderManage orderManage;

    // ✅ 상품 정보와의 관계 (N:1)
    // order_items.product_no → product.product_no
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_no", referencedColumnName = "product_no")
    private Product product;
}