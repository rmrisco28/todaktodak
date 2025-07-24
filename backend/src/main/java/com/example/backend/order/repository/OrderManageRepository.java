package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderManage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderManageRepository extends JpaRepository<OrderManage, Integer> {
}