package com.example.backend.order.controller;

import com.example.backend.order.dto.ReturnRequestDto;
import com.example.backend.order.service.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/return")
@RequiredArgsConstructor
public class ReturnController {

    private final ReturnService returnService;

    @PostMapping
    public String submitReturn(@RequestBody ReturnRequestDto rrDto) {
        returnService.processReturn(rrDto);
        return "반품 신청이 정상적으로 처리되었습니다.";
    }
}