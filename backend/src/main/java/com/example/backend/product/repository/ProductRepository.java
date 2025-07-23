package com.example.backend.product.repository;

import com.example.backend.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT MAX(p.seq) FROM Product p")
    Integer findMaxSeq();

}