package com.example.backend.category.service;

import com.example.backend.category.dto.CategoryAddForm;
import com.example.backend.category.entity.Category;
import com.example.backend.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
