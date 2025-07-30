package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.entity.Receive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiveRepository extends JpaRepository<Receive, Integer> {

    Receive findBySeq(Integer seq);
}