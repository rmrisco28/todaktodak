package com.example.backend.order.controller;

import com.example.backend.order.service.ReturnFormService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/return")
@RequiredArgsConstructor
public class ReturnController {

    private ReturnFormService returnFormService;

    @GetMapping("add")
    public ResponseEntity<?> returnForm() {

        returnFormService.add();

        return null;
    }
}
