package com.example.backend.order.controller;

import com.example.backend.order.dto.ReceiveRequestDto;
import com.example.backend.order.service.ReceiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class ReceiveController {

    private final ReceiveService receiveService;

    @PatchMapping("/receive")
    public ResponseEntity<Void> receiveOrder(@RequestBody ReceiveRequestDto dto) {
        receiveService.receive(dto);
        return ResponseEntity.ok().build();
    }
}
