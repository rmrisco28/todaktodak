package com.example.backend.sale.repository;

import com.example.backend.sale.entity.Sale;
import com.example.backend.sale.entity.SaleImageThumb;
import com.example.backend.sale.entity.SaleImageThumbId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleImageThumbRepository extends JpaRepository<SaleImageThumb, SaleImageThumbId> {
    List<SaleImageThumb> findBySale(Sale sale);
}