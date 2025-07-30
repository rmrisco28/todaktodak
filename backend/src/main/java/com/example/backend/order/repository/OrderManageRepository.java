package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderManage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderManageRepository extends JpaRepository<OrderManage, Integer> {
    List<OrderManage> findByMember_Seq(Integer memberId);

    OrderManage findBySeq(Integer orderManageSeq);
}