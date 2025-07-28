package com.example.backend.sale.repository;

import com.example.backend.sale.entity.SaleImageThumb;
import com.example.backend.sale.entity.SaleImageThumbId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleImageThumbRepository extends JpaRepository<SaleImageThumb, SaleImageThumbId> {
}