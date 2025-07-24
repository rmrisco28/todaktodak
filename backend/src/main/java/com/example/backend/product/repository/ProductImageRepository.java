package com.example.backend.product.repository;

import com.example.backend.product.entity.Product;
import com.example.backend.product.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
    List<ProductImage> findByProductNo(Product product);
}