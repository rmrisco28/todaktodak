package com.example.backend.rental.repository;

import com.example.backend.rental.dto.RenewDto;
import com.example.backend.rental.dto.RentalAdminDto;
import com.example.backend.rental.dto.RentalDto;
import com.example.backend.rental.dto.RentalListDto;
import com.example.backend.rental.entity.Rental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
    @Query("SELECT MAX(r.seq) FROM Rental r")
    Integer findMaxSeq();

    @Query(value = """
                    SELECT new com.example.backend.rental.dto.RentalListDto(
                    r.seq,
                    r.productNo.name,
                    r.orderNo.orderCount,
                    r.productNo.price,
                    r.startDttm,
                    r.endDttm,
                    r.state
                    )
                    FROM Rental r
                    WHERE (r.useYn = true
                    AND r.delYn=false)
                    AND r.productNo.name LIKE %:keyword%
                    ORDER BY r.seq DESC
            """)
    Page<RentalListDto> searchRentalList(@Param("keyword") String keyword, Pageable pageable);


    @Query(value = """
            SELECT new com.example.backend.rental.dto.RentalDto(
                        r.seq,
                        r.rentalNo,
                        r.orderNo.orderCount,
                        r.productNo.name,
                        r.productNo.price,
            
                        r.startDttm,
                        r.endDttm,
                        r.state,
                        r.orderNo.name,
                        r.orderNo.post,
            
                        r.orderNo.addr,
                        r.orderNo.addrDetail,
                        r.orderNo.phone,
                        r.orderNo.orderNo,
                        r.productNo.productNo,
            
                        r.orderNo.saleNo.saleNo,
                        r.memberNo.memberNo
                        )
                    FROM Rental r
                    WHERE r.seq = :seq
                    AND r.useYn=true
                    AND r.delYn=false
            """)
    RentalDto findRentalBySeq(Integer seq);

    Optional<Rental> findByRentalNo(String rentalNo);

    RenewDto findRenewBySeq(Integer seq);


    @Query(value = """
                    SELECT new com.example.backend.rental.dto.RentalAdminDto(
                    r.seq,
                    r.rentalNo,
                    r.orderNo.orderNo,
                    r.orderNo.name,
                    r.orderNo.phone,
            
                    r.orderNo.orderCount,
                    r.productNo.productNo,
                    r.productNo.name,
                    r.productNo.price,
                    r.startDttm,
            
                    r.endDttm,
                    r.state,
                    r.useYn,
                    r.delYn
                    )
                    FROM Rental r
                    WHERE (r.useYn = true
                    AND r.delYn=false)
                    AND r.productNo.name LIKE %:keyword%
                    ORDER BY r.seq DESC
            """)
    Page<RentalAdminDto> searchRentalAdminList(@Param("keyword") String keyword, Pageable pageable);

    Rental findRentalByrentalNo(String rentalNo);
}