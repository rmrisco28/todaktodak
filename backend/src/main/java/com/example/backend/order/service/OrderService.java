package com.example.backend.order.service;

import com.example.backend.order.dto.OrderListDto;
import com.example.backend.order.repository.OrderManageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

//    private final OrderManageRepository orderManageRepository;
//
//    public List<OrderListDto> list() {
//
//        return orderManageRepository.findAllByOrderBySeqDesc();
//    }
}