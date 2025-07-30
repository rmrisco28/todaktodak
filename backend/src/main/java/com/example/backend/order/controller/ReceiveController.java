package com.example.backend.order.controller;

import com.example.backend.order.dto.ReceiveRequestDto;
import com.example.backend.order.dto.ReceiveResponseDto;
import com.example.backend.order.service.ReceiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // ✅ REST 컨트롤러로 지정 (View 반환이 아닌 JSON 반환)
@RequestMapping("/api/receive") // ✅ receive 기능은 /api/receive 경로 하위로 분리
@RequiredArgsConstructor // ✅ 생성자 주입을 위한 Lombok 어노테이션 (final 필드 자동 주입)
public class ReceiveController {

    private final ReceiveService receiveService;

    /**
     * ✅ 수령 정보 조회 API
     * - 클라이언트에서 주문 번호(orderManageSeq)를 통해 수령 전 주문 상태 정보를 확인할 때 사용
     * - 연결된 프론트엔드 URL: `/receive/:orderId` (useParams로 받은 orderId → orderManageSeq)
     *
     * 예시 요청: GET /api/receive?orderManageSeq=123
     *
     * @param seq 주문 관리 번호 (OrderManage.seq)
     * @return 수령 정보 응답 DTO
     */
    @GetMapping("")
    public ResponseEntity<ReceiveResponseDto> getReceiveInfo(@RequestParam("orderManageSeq") Integer seq) {
        ReceiveResponseDto dto = receiveService.getReceiveInfo(seq);
        return ResponseEntity.ok(dto);
    }

    /**
     * ✅ 수령 처리 실행 API
     * - 상품 수령 버튼 클릭 시 호출됨
     * - 수령 내역을 기록하고 수령자, 메모 등을 저장
     * - 연결된 프론트엔드 URL: `/receive/exec`
     * - 프론트는 POST 대신 PATCH 사용 중
     *
     * 예시 요청: PATCH /api/receive/exec
     * 요청 본문: { orderManageSeq: 123, memberNo: "M001", memo: "문 앞에 놔주세요" }
     *
     * @param dto 수령 요청 DTO (ReceiveRequestDto)
     * @return HTTP 200 OK
     */
    @PatchMapping("/exec")
    public ResponseEntity<Void> receiveExec(@RequestBody ReceiveRequestDto dto) {
        receiveService.receiveExec(dto);
        return ResponseEntity.ok().build(); // 응답 본문 없음
    }
}