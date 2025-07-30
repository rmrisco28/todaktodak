package com.example.backend.order.controller;

import com.example.backend.order.dto.ReceiveRequestDto;
import com.example.backend.order.dto.ReceiveResponseDto;
import com.example.backend.order.service.ReceiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/receive")
@RequiredArgsConstructor
public class ReceiveController {

    private final ReceiveService receiveService;

    /**
     * ✅ 올바른 매핑: GET /api/receive?orderManageSeq=123
     *    (프론트의 /receive/:orderId와 연결됨)
     */
    @GetMapping("")
    public ResponseEntity<ReceiveResponseDto> getReceiveInfo(@RequestParam("orderManageSeq") Integer seq) {
        ReceiveResponseDto dto = receiveService.getReceiveInfo(seq);
        return ResponseEntity.ok(dto);
    }

    /**
     * ✅ 수령 처리 실행: PATCH /api/receive/exec
     */
    @PatchMapping("/exec")
    public ResponseEntity<Void> receiveExec(@RequestBody ReceiveRequestDto dto) {
        receiveService.receiveExec(dto);
        return ResponseEntity.ok().build();
    }
}