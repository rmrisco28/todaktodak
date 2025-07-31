package com.example.backend.product.controller;

import com.example.backend.product.dto.ProductAddForm;
import com.example.backend.product.dto.ProductDto;
import com.example.backend.product.dto.ProductNameListDto;
import com.example.backend.product.dto.ProductUpdateForm;
import com.example.backend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    /**
     * 상품 삭제
     *
     * @param seq
     * @return
     */
    @PutMapping("{seq}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer seq) {

        try {
            productService.updateDelYn(seq);
            return ResponseEntity.ok().body(Map.of("Message",
                    Map.of("type", "success", "text", seq + "번 상품이 삭제되었습니다.")));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

    /**
     * 상품 수정
     *
     * @param seq
     * @param dto
     * @return
     */
    @PutMapping("modify/{seq}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer seq, ProductUpdateForm dto) {

        boolean result = productService.validateForUpdate(dto);

        try {
            if (result) {
                productService.update(dto);

                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", seq + " 번 상품이 수정되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "입력한 내용이 유효하지 않습니다.")));
            }

        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

    /**
     * 특정 카테고리의 상품 목록 조회
     *
     * @return
     */
    @GetMapping("formSelect")
    public List<ProductNameListDto> getProductsByCategory(String category) {
        return productService.productListByCategory(category);
    }

}
