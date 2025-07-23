package com.example.backend.product.repository;

import com.example.backend.product.dto.ProductListDto;
import com.example.backend.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT MAX(p.seq) FROM Product p")
    Integer findMaxSeq();

    @Query(value = """
            SELECT new com.example.backend.product.dto.ProductListDto(
            p.seq,
            p.name,
            p.productNo,
            p.insertDttm
                        )
            FROM Product p
            WHERE p.name LIKE %:keyword%
                OR p.productNo LIKE %:keyword%
            ORDER BY p.seq DESC
            """)
    Page<ProductListDto> findAllBy(String keyword, PageRequest of);
}