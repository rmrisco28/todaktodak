package com.example.backend.order.controller;

import com.example.backend.order.dto.ReturnAddDto;
import com.example.backend.order.service.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/return")
@RequiredArgsConstructor
public class ReturnController {

    private ReturnService returnService;

    @PostMapping("add")
    public ResponseEntity<?> addReturn(@RequestBody ReturnAddDto returnAddDto) {

        returnService.add(returnAddDto);
//        for (ReturnAddDto dto : list) {
//            System.out.println(dto);
//        }
//        if (!exists) {
//            return ResponseEntity.ok("신청 완료");
//        } else {
//            return ResponseEntity.badRequest().build();
//        }
        return null;
    }

    @GetMapping("")
    public ResponseEntity<?> returnForm(ReturnAddDto returnAddDto) {

        return null;
    }
}