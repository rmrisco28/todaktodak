package com.example.backend.category.repository;

import com.example.backend.category.dto.CategoryDto;
import com.example.backend.category.dto.CategoryListDto;
import com.example.backend.category.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(value = """
            SELECT new com.example.backend.category.dto.CategoryListDto(
            c.seq,
            c.name,
            c.insertDttm,
            c.updateDttm,
            c.useYn
                        )
            FROM Category c
            WHERE (c.useYn = true 
                AND c.delYn = false)
                AND c.name LIKE %:keyword%
            ORDER BY c.seq DESC
            """)
    Page<CategoryListDto> searchCategoryList(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = """
                SELECT new com.example.backend.category.dto.CategoryDto(
                c.seq,
                c.name,
                c.imageName,
                c.useYn
                )
                FROM Category c
                WHERE c.seq = :seq
                  AND c.useYn = true
                  AND c.delYn = false
            """)
    CategoryDto findCategoryBySeq(Integer seq);

    @Query(value = """
                    SELECT new com.example.backend.category.dto.CategoryDto(
                    c.seq,
                    c.name,
                    c.imageName,
                    c.useYn
                    )
                    FROM Category c
                    WHERE c.useYn = true
                      AND c.delYn = false
            """)
    List<CategoryDto> findCategoryAll();
}