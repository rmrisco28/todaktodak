package com.example.backend.category.service;

import com.example.backend.category.dto.CategoryAddForm;
import com.example.backend.category.dto.CategoryListDto;
import com.example.backend.category.entity.Category;
import com.example.backend.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public boolean validateForAdd(CategoryAddForm dto) {

        if (dto.getName() == null || dto.getName().trim().isBlank()) {
            return false;
        }
        return true;
    }

    public void add(CategoryAddForm dto) {
        // TODO 권한 체크 (관리자)

        Category category = new Category();
        category.setName(dto.getName());
        categoryRepository.save(category);

    }

    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<CategoryListDto> categoryListDtoPage = categoryRepository.searchCategoryList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = categoryListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "categoryList", categoryListDtoPage.getContent());
    }
}
