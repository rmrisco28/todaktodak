package com.example.backend.sale.repository;

import com.example.backend.sale.dto.SaleDto;
import com.example.backend.sale.dto.SaleListDto;
import com.example.backend.sale.entity.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SaleRepository extends JpaRepository<Sale, Integer> {

    @Query("SELECT MAX(s.seq) FROM Sale s")
    Integer findMaxSeq();

    @Query(value = """
            SELECT new com.example.backend.sale.dto.SaleListDto (
                        s.seq,
                        t.id.name,
                        s.title,
                        s.salePrice,
                        s.saleNo,
                        s.insertDttm
                        )
            FROM Sale s
            LEFT JOIN SaleImageThumb t 
                ON t.sale.saleNo = s.saleNo
            WHERE (s.useYn = true 
                AND s.delYn = false)
                AND (s.title LIKE %:keyword%
                OR s.saleNo LIKE %:keyword%)
            ORDER BY s.seq DESC
            """)
    Page<SaleListDto> searchSaleList(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = """
            SELECT new com.example.backend.sale.dto.SaleDto(
            s.seq,
            s.saleNo,
            s.productNo.productNo,
            s.category,
            s.title,
            s.quantity,
            s.salePrice,
            s.deliveryFee,
            s.content,
            s.view,
            s.insertDttm,
            s.updateDttm,
            s.useYn
            )
            FROM Sale s
            WHERE s.seq = :seq
              AND s.useYn = true
              AND s.delYn = false
            """)
    SaleDto findSaleBySeq(Integer seq);

    Sale findBySaleNo(String saleNo);
}