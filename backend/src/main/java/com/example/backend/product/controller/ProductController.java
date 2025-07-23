package com.example.backend.product.controller;

import com.example.backend.product.dto.ProductAddForm;
import com.example.backend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    /**
     * 기능명: 상품 등록
     * 권한: 관리자
     *
     * @param dto
     * @return
     */
    @PostMapping("add")
    public ResponseEntity<?> add(ProductAddForm dto) {
        // validate
        boolean result = productService.validateForAdd(dto);

        if (result) {
            productService.add(dto);

            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "새 상품이 등록되었습니다.")));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error", "text", "입력한 내용이 유효하지 않습니다.")));
        }
    }

}
