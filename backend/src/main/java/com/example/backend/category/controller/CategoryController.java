package com.example.backend.category.controller;

import com.example.backend.category.dto.CategoryAddForm;
import com.example.backend.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
