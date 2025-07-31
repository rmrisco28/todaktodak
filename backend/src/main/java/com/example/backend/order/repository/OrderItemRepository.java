package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderItem;
import com.example.backend.order.entity.OrderManage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * ✅ 주문 상품 항목(OrderItem) 관련 JPA 리포지토리
 * - order_items 테이블에 대한 CRUD 처리를 담당합니다.
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    /**
     * ✅ 특정 주문(OrderManage)에 속한 주문 상품 항목 리스트 조회
     * @param order 주문 엔티티 (OrderManage)
     * @return 해당 주문에 연결된 모든 주문 상품 리스트
     */
    List<OrderItem> findByOrderManage(OrderManage order);
}