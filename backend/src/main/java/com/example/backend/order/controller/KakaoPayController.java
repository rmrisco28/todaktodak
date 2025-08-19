package com.example.backend.order.controller;

import com.example.backend.order.dto.KakaoPayApproveResponse;
import com.example.backend.order.dto.KakaoPayReadyResponse;
import com.example.backend.order.dto.KakaoPayRequest;
import com.example.backend.order.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kakaopay")
@RequiredArgsConstructor
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    @PostMapping("/ready")
    public ResponseEntity<?> kakaoPayReady(@RequestBody KakaoPayRequest request) {
        KakaoPayReadyResponse response = kakaoPayService.kakaoPayReady(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/approve")
    public ResponseEntity<?> kakaoPayApprove(
            @RequestParam("pg_token") String pgToken,
            @RequestParam("tid") String tid
    ) {
        // 실제 결제 승인 처리 (포트폴리오용이면 mock 응답 가능)
        KakaoPayApproveResponse response = kakaoPayService.kakaoPayApprove(tid, pgToken);
        return ResponseEntity.ok(response);
    }
}
