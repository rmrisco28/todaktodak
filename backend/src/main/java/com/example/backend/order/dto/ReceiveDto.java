package com.example.backend.order.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data // ✅ getter/setter/toString 등 메서드 자동 생성
public class ReceiveDto {

    // ✅ 수령 정보 식별자 (보통 receive 테이블의 seq)
    private Integer seq;

    // ✅ 수령한 상품명 (예: "토닥로션")
    private String productName;

    // ✅ 주문자 이름
    private String orderName;

    // ✅ 주문자 전화번호
    private String orderPhone;

    // ✅ 배송지 주소 (주소 + 상세주소 포함일 가능성 있음)
    private String orderAddress;

    // ✅ 주문 수량 (해당 상품의 수량)
    private Integer orderQuantity;

    // ✅ 주문 일자 (수령 기준으로 표시되는 경우가 많음)
    private LocalDateTime orderDate;
}