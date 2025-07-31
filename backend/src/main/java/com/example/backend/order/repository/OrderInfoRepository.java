package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Integer> {
    @Query("SELECT MAX(o.seq) FROM OrderInfo o")
    Integer findMaxSeq();
}