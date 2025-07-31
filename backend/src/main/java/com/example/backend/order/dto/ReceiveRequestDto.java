package com.example.backend.order.dto;

import lombok.Data;

@Data // ✅ getter/setter, toString 등 자동 생성
public class ReceiveRequestDto {

    // ✅ 수령 대상 주문의 고유 번호 (order_manage.seq)
    private Integer seq;

    // ✅ 수령한 사용자 번호 (member.member_no, 문자열형 ID)
    private String memberNo;

    // ✅ 수령 시 남긴 메모 (예: "문 앞에 놔주세요", "빠르게 받았습니다" 등)
    private String memo;
}