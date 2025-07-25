package com.example.backend.order.repository;

import com.example.backend.order.dto.OrderListDto;
import com.example.backend.order.entity.OrderManage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderManageRepository extends JpaRepository<OrderManage, Integer> {

    List<Object> findByName(String odrName);

//    static Page<OrderListDto> findAllBy(String keyword, PageRequest of) {
//    }
}