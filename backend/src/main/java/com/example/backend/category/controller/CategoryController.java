package com.example.backend.category.controller;

import com.example.backend.category.dto.CategoryAddForm;
import com.example.backend.category.dto.CategoryDto;
import com.example.backend.category.dto.CategoryUpdateForm;
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
     * @param dto
     * @return
     * @brief Add Category (permission: Administrator)
     * @author minki-jeon
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
     * @param keyword
     * @param pageNumber
     * @return
     * @brief View Category List (permission: Administrator)
     * @author minki-jeon
     */
    @GetMapping("list")
    public Map<String, Object> getAllCategory(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return categoryService.list(keyword, pageNumber);
    }

    /**
     * @param seq
     * @return
     * @brief Delete Category (permission: Administrator)
     * @author minki-jeon
     */
    @PutMapping("{seq}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer seq) {

        try {
            categoryService.updateDelYn(seq);
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "warning", "text", seq + "번 카테고리가 삭제되었습니다.")));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

    /**
     * @param seq
     * @return
     * @brief View Category Details (permission: Administrator)
     * @author minki-jeon
     */
    @GetMapping("detail/{seq}")
    public CategoryDto getCategoryBySeq(@PathVariable Integer seq) {
        return categoryService.getCategoryBySeq(seq);
    }


    /**
     * @param seq
     * @param dto
     * @return
     * @brief Edit Category (permission: Administrator)
     * @author minki-jeon
     */
    @PutMapping("modify/{seq}")
    public ResponseEntity<?> updateCategory(@PathVariable Integer seq, CategoryUpdateForm dto) {

        boolean result = categoryService.validateForUpdate(dto);

        try {
            if (result) {
                categoryService.update(dto);

                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", seq + " 번 카테고리가 수정되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "입력한 내용이 유효하지 않습니다.")));
            }

        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

}
