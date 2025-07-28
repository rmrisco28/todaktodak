package com.example.backend.sale.repository;

import com.example.backend.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleRepository extends JpaRepository<Sale, Integer> {

    @Query("SELECT MAX(s.seq) FROM Sale s")
    Integer findMaxSeq();
}