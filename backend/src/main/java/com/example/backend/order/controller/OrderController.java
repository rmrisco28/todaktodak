package com.example.backend.order.controller;

import com.example.backend.order.dto.OrderDetailDto;
import com.example.backend.order.dto.OrderListDto;
import com.example.backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/list")
    public ResponseEntity<List<OrderListDto>> getOrderList() {
        List<OrderListDto> orderList = orderService.getList();
        return ResponseEntity.ok(orderList);
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveOrder(@RequestBody OrderListDto orderListDto) {
        orderService.save(orderListDto);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("detail")
//    public ResponseEntity<?> detail(OrderDetailDto orderDetailDto) {
//
//        orderService.detail(orderDetailDto);
//
//        return ResponseEntity.ok(orderDetailDto);
//    }
}