package com.example.backend.order.repository;

import com.example.backend.order.dto.OrderDto;
import com.example.backend.order.dto.OrderListAllDto;
import com.example.backend.order.entity.OrderList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderListRepository extends JpaRepository<OrderList, Integer> {
    @Query("""
                SELECT new com.example.backend.order.dto.OrderListAllDto
                (
                ol.seq,
                ol.orderNo,
                ol.saleNo.saleNo,
                s.title saleTitle,
                ol.name,
                ol.totalPrice,
                ol.state,
                ol.insertDttm,
                ol.updateDttm
                ) FROM OrderList ol
                LEFT JOIN Sale s
                      ON s.saleNo = ol.saleNo.saleNo
                WHERE (ol.useYn = true
                AND ol.delYn = false)
                AND (ol.orderNo LIKE %:keyword%
                OR ol.saleNo.saleNo LIKE %:keyword%
                OR ol.name LIKE %:keyword%
                OR ol.state LIKE %:keyword%)
            """)
    Page<OrderListAllDto> searchOrderListAll(@Param("keyword") String keyword, Pageable pageable);

    @Query("""
                        SELECT new com.example.backend.order.dto.OrderDto
                        (
                        ol.seq,
                        s.saleNo,
                        s.title saleTitle,
                        ol.orderNo,
                        ol.prodPrice,
                        ol.orderCount,
                        ol.rentalPeriod,
                        ol.state,
                        ol.insertDttm,
                        ol.recipient,
                        ol.phone,
                        ol.post,
                        ol.addr,
                        ol.addrDetail,
                        ol.request,
                        ol.deliveryCompany,
                        ol.tracking,
                        ol.totalPrice,
                        ol.deliveryFee,
                        ol.totProdPrice
                        ) FROM OrderList ol
                        LEFT JOIN Sale s
                               ON s.saleNo = ol.saleNo.saleNo
                        WHERE ol.seq = :seq
                            AND (ol.useYn = true
                            AND ol.delYn = false)
            
            """)
    OrderDto findOrderDetailBySeq(Integer seq);

    OrderList findBySeq(Integer seq);
}