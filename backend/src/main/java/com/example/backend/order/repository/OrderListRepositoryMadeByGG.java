package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderListRepositoryMadeByGG extends JpaRepository<OrderList, Integer> {
    @Query("SELECT MAX(o.seq) FROM OrderList o")
    Integer findMaxSeq();
}