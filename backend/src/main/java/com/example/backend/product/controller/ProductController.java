package com.example.backend.product.controller;

import com.example.backend.product.dto.ProductAddForm;
import com.example.backend.product.dto.ProductDto;
import com.example.backend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    /**
     * 기능명: 상품 등록 기능
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

    /**
     * 상품관리 목록 조회 (관리자)
     *
     * @param keyword
     * @param pageNumber
     * @return
     */
    @GetMapping("list")
    public Map<String, Object> getAllProducts(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return productService.list(keyword, pageNumber);
    }

    /**
     * 상품관리 상세 조회 (관리자)
     *
     * @param seq
     * @return
     */
    @GetMapping("detail/{seq}")
    public ProductDto getProductBySeq(@PathVariable Integer seq) {
        return productService.getProductBySeq(seq);
    }


}
