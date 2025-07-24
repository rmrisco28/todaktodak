package com.example.backend.order.controller;

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

    private final OrderService orderService;

//    @GetMapping("list")
//    public Map<String, Object> getAllBoards(
//            @RequestParam(value = "q", defaultValue = "") String keyword,
//            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber) {
//
//        return OrderService.list(keyword, pageNumber);
//    }
//    @PutMapping("{id}")
//    @PreAuthorize("isAuthenticated()")
//    public ResponseEntity<?> updateBoard(@PathVariable Integer id,
//                                         OrderManageDto orderManageDto,
//                                         Authentication authentication) {
//
//        boolean result = orderService.validateForUpdate(orderManageDto);
//        if (result) {
//            orderService.update(orderManageDto, authentication);
//
//            return ResponseEntity.ok().body(Map.of("message",
//                    Map.of("type", "success", "text", id + "번 주문을 처리했습니다.")));
//        } else {
//            return ResponseEntity.badRequest().body(Map.of("message",
//                    Map.of("type", "error", "text", "번 주문을 처리하지 못했습니다.")));
//        }
//
//    }
//
//    @DeleteMapping("{id}")
//    @PreAuthorize("isAuthenticated()")
//    public ResponseEntity<?> deleteBoard(@PathVariable Integer id,
//                                         Authentication authentication) {
//        orderService.deleteById(id, authentication);
//        return ResponseEntity.ok().body(Map.of("message",
//                Map.of("type", "success", "text", id + "번 주문이 취소 되었습니다.")));
//    }
//
//    @GetMapping("{id}")
//    public OrderManageDto getBoardById(@PathVariable Integer id) {
//        return orderService.getOrderById(id);
//    }
}