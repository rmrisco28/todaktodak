package com.example.backend.order.controller;

import com.example.backend.order.dto.ReturnAddDto;
import com.example.backend.order.service.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/return")
@RequiredArgsConstructor
public class ReturnController {

    private ReturnService returnService;

    @PostMapping("add")
    public ResponseEntity<ReturnAddDto> addReturn(@RequestBody ReturnAddDto returnAddDto) {

        List<ReturnAddDto> list = returnService.getList();

        for (ReturnAddDto dto : list) {
            System.out.println(dto);
        }

        return null;
    }

    @GetMapping("")
    public ResponseEntity<?> returnForm(ReturnAddDto returnAddDto) {

        return null;
    }
}
