package com.example.backend.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter // ✅ 각 필드에 대한 getter 자동 생성
@AllArgsConstructor // ✅ 모든 필드를 인자로 받는 생성자 자동 생성
public class OrderDetailDto {

    // ✅ 주문 고유 식별자 (order_manage.seq)
    private Integer seq;

    // ✅ 주문번호 (예: ORD20250731-0001 등)
    private String orderNo;

    // ✅ 주문 일자 (LocalDateTime으로 저장)
    private LocalDateTime orderDate;

    // ✅ 주문된 상품들의 이름 목록 (복수 상품 대응용)
    private List<String> productNames;

    // ✅ 각 상품의 수량 (productNames와 동일한 인덱스 기준)
    private List<Integer> quantities;

    // ✅ 각 상품의 단가 (productNames와 동일한 인덱스 기준)
    private List<Integer> prices;

    // ✅ 총 결제 금액 (수량 × 단가 합산)
    private int totalPrice;

    // ✅ 주문 상태 (예: 결제완료, 배송중, 수령완료 등)
    private String status;

    // ✅ 송장 번호 (배송 추적용, null 가능)
    private String trackNo;
}