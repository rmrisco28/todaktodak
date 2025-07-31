package com.example.backend.order.dto;

import lombok.Data;

@Data // ✅ getter, setter, toString 등 Lombok이 자동 생성
public class ReturnRequestDto {

    // ✅ 반품 대상 주문 번호 (예: ORD1234567)
    private String orderNo;

    // ✅ 반품 대상 상품 번호 (예: PROD00123)
    private String productNo;

    // ✅ 반품 사유 (예: "상품 불량", "마음에 들지 않음" 등)
    private String reason;

    // ✅ 고객 이름 (주문자 이름)
    private String customerName;

    // ✅ 고객 연락처 (주문 시 입력한 전화번호)
    private String phone;
}