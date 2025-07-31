package com.example.backend.order.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data // ✅ getter/setter/toString 등 자동 생성
public class ReceiveResponseDto {

    // ✅ 주문된 상품 이름 (예: "토닥로션")
    private String productName;

    // ✅ 배송지 주소 (주소 + 상세 주소 조합 예상)
    private String address;

    // ✅ 현재 주문 상태 (예: 배송중, 배송완료, 수령완료)
    private String status;

    // ✅ 주문 일자 (yyyy-MM-dd HH:mm 형식 문자열로 가공됨)
    private String orderDate;

    // ✅ 실제 수령 처리된 시각 (null이면 아직 미처리 상태)
    private LocalDateTime receivedAt;

    // ✅ 수령 처리한 회원의 memberNo (주로 관리자나 본인)
    private String memberNo;

    // ✅ 수령 시 기재한 메모
    private String memo;
}