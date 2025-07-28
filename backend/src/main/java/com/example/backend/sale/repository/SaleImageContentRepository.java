package com.example.backend.sale.repository;

import com.example.backend.sale.entity.SaleImageContent;
import com.example.backend.sale.entity.SaleImageContentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleImageContentRepository extends JpaRepository<SaleImageContent, SaleImageContentId> {
}