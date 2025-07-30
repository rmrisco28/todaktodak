package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderItem;
import com.example.backend.order.entity.OrderManage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderManage(OrderManage order);
}