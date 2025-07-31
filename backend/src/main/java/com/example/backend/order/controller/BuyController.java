package com.example.backend.order.controller;

import com.example.backend.order.dto.OrderInfoDto;
import com.example.backend.order.service.BuyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BuyController {
    private final BuyService buyService;

    // 주문 배송, 결제 정보
    @PostMapping("buy")
    public ResponseEntity<?> buy(@RequestBody OrderInfoDto oid) {
        System.out.println("BuyController.buy");
        buyService.buy(oid);


        return ResponseEntity.ok(Map.of("message", "결제완료 되었습니다."));
    }
}
