package com.example.backend.order.controller;

import com.example.backend.order.dto.ReturnRequestDto;
import com.example.backend.order.service.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController // ✅ REST 컨트롤러 지정 (JSON 반환용)
@RequestMapping("/api/return") // ✅ 반품 기능 API는 /api/return 하위에서 처리
@RequiredArgsConstructor // ✅ 생성자 주입 자동 생성 (final 필드 주입)
public class ReturnController {

    private final ReturnService returnService;

    /**
     * ✅ 반품 신청 API
     * - 프론트에서 반품 폼 제출 시 호출
     * - 요청 본문에 반품 관련 정보 포함 (ReturnRequestDto 사용)
     * - ReturnService를 통해 DB에 저장 처리
     *
     * 예시 요청:
     * POST /api/return
     * {
     *   "orderNo": "ORD1234",
     *   "productNo": "PROD5678",
     *   "reason": "제품이 마음에 들지 않음",
     *   "customerName": "홍길동",
     *   "phoneNumber": "010-1234-5678"
     * }
     *
     * @param rrDto 반품 요청 DTO
     * @return 처리 결과 메시지 (성공 텍스트 반환)
     */
    @PostMapping
    public String submitReturn(@RequestBody ReturnRequestDto rrDto) {
        returnService.processReturn(rrDto);
        return "반품 신청이 정상적으로 처리되었습니다.";
    }
}