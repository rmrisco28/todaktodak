package com.example.backend.delivery.repository;

import com.example.backend.delivery.dto.DeliveryDto;
import com.example.backend.delivery.dto.DeliveryListDto;
import com.example.backend.delivery.entity.Delivery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
    @Query(value = """
            SELECT new com.example.backend.delivery.dto.DeliveryListDto(
            d.seq,
            d.code,
            d.name,
            d.callNo,
            d.insertDttm,
            d.updateDttm,
            d.useYn
                        )
            FROM Delivery d
            WHERE (d.useYn = true
                AND d.delYn = false)
                AND (d.name LIKE %:keyword%
                OR d.callNo LIKE %:keyword%)
            ORDER BY d.seq DESC
            """)
    Page<DeliveryListDto> searchDeliveryList(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = """
                SELECT new com.example.backend.delivery.dto.DeliveryDto(
                d.seq,
                d.code,
                d.name,
                d.callNo,
                d.useYn
                )
                FROM Delivery d
                WHERE d.seq = :seq
                  AND d.useYn = true
                  AND d.delYn = false
            """)
    DeliveryDto findDeliveryBySeq(Integer seq);

    @Query(value = """
                    SELECT new com.example.backend.delivery.dto.DeliveryDto(
                    d.seq,
                    d.code,
                    d.name,
                    d.callNo,
                    d.useYn
                    )
                    FROM Delivery d
                    WHERE d.useYn = true
                      AND d.delYn = false
            """)
    List<DeliveryDto> findDeliveryAll();
}