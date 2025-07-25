package com.example.backend.order.controller;

import com.example.backend.order.dto.OrderListDto;
import com.example.backend.order.dto.OrderManageDto;
import com.example.backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

//    private final OrderService orderService;

//    @GetMapping("list")
//    public List<OrderListDto> getAllOrders() {
//
//        return orderService.list();
//    }
}