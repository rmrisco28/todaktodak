package com.example.backend.category.controller;

import com.example.backend.category.dto.CategoryAddForm;
import com.example.backend.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * 기능명: 카테고리 등록 기능
     * 권한: 관리자
     *
     * @param dto
     * @return
     */
    @PostMapping("add")
    public ResponseEntity<?> add(CategoryAddForm dto) {
        // validate
        boolean result = categoryService.validateForAdd(dto);

        if (result) {
            categoryService.add(dto);

            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "카테고리가 등록되었습니다.")));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error", "text", "입력한 내용이 유효하지 않습니다.")));
        }
    }

    /**
     * 카테고리 목록 조회 (관리자)
     *
     * @param keyword
     * @param pageNumber
     * @return
     */
    @GetMapping("list")
    public Map<String, Object> getAllCategory(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return categoryService.list(keyword, pageNumber);
    }

    /**
     * 카테고리 삭제 (관리자)
     *
     * @param seq
     * @return
     */
    @PutMapping("{seq}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer seq) {

        try {
            categoryService.updateDelYn(seq);
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "warning", "text", seq + "번 카테고리가 삭제되었습니다.")));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

}
