package com.example.backend.order.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "return_request") // ✅ 반품 요청 테이블
public class ReturnRequest {

    // ✅ 기본 키 (자동 증가)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ 주문번호 (단순 문자열, 식별용)
    private String orderNumber;

    // ✅ 상품코드 (단순 문자열, 식별용)
    private String productCode;

    // ✅ 반품 사유
    private String reason;

    // ✅ 고객명 (반품 신청자 이름)
    private String customerName;

    // ✅ 고객 연락처
    private String phoneNumber;

    // ✅ 반품 신청 시간 (생성 시 자동 입력)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ 연관된 주문 (OrderManage.orderNo를 참조)
    @ManyToOne
    @JoinColumn(name = "order_no", referencedColumnName = "order_no")
    private OrderManage orderNo;

    // ✅ 상품 번호 (다시 한 번 명시된 product_no 컬럼)
    @Column(name = "product_no", length = 100)
    private String productNo;

    // ✅ 연관된 주문 상품 항목 (OrderItem.seq)
    @ManyToOne
    @JoinColumn(name = "order_item_seq")
    private OrderItem orderItemSeq;
}