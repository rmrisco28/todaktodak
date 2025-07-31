package com.example.backend.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data // ✅ getter, setter, toString, equals, hashCode 자동 생성
@AllArgsConstructor // ✅ 모든 필드를 받는 생성자 자동 생성
public class OrderManageDto {

    // ✅ 주문 관리 테이블의 기본 키 (order_manage.seq)
    private Integer seq;

    // ✅ 주문 번호 (예: ORD20250731-0001) - 고유 식별자로 UI 출력에 자주 사용
    private String orderNo;

    // ✅ 주문일시 (주문이 접수된 시간)
    private LocalDateTime orderDate;

    // ✅ 주문된 상품명들의 조합 (예: "토닥로션, 수분크림")
    // - 여러 상품이 포함된 주문을 UI에 한 줄로 표시하기 위한 가공 필드
    private String productNames;

    // ✅ 총 주문 금액 (상품 금액 × 수량 총합)
    private Integer totalPrice;

    // ✅ 주문 상태 (예: 결제완료, 배송중, 배송완료, 수령완료 등)
    private String status;

    // ✅ 송장번호 (택배사 운송장 정보 등)
    private String trackNo;

    // ✅ 삭제 여부 (Y/N) - 관리자용 화면에서 구분 처리용
    private String delYn;
}