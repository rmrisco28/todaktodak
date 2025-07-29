package com.example.backend.sale.repository;

import com.example.backend.sale.entity.Sale;
import com.example.backend.sale.entity.SaleImageContent;
import com.example.backend.sale.entity.SaleImageContentId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleImageContentRepository extends JpaRepository<SaleImageContent, SaleImageContentId> {
    List<SaleImageContent> findBySale(Sale sale);
}