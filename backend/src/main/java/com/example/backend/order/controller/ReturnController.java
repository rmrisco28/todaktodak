package com.example.backend.order.controller;

import com.example.backend.order.dto.ReturnAddDto;
import com.example.backend.order.service.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/return")
@RequiredArgsConstructor
public class ReturnController {

    private final ReturnService returnService;

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody ReturnAddDto returnAddDto) {

        returnService.add(returnAddDto);

        return ResponseEntity.ok("반납 신청이 완료되었습니다.");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> returnForm() {

//        returnService.list(returnAddDto);

        return null;
    }
}