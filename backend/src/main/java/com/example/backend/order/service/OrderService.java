package com.example.backend.order.service;

import com.example.backend.order.dto.OrderDetailDto;
import com.example.backend.order.dto.OrderListDto;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.repository.OrderManageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderManageRepository orderManageRepository;


    public List<OrderListDto> getList() {
        return orderManageRepository.findAll().stream()
                .map(order -> OrderListDto.builder()
                        .odrName(order.getName())
                        .orderState(order.getState())
                        .orderOption(order.getOrderOption())
                        .count(order.getCount())
                        .totalPrice(order.getTotalPrice())
                        .insertDttm(order.getInsertDttm())
                        .updateDttm(order.getUpdateDttm())
                        .build()
                )
                .collect(Collectors.toList());
    }


    public void save(OrderListDto orderListDto) {
        OrderManage order = new OrderManage();
        order.setOrderOption(orderListDto.getOrderOption());

        if (orderListDto.getInsertDttm() != null) {
            order.setReservDt(orderListDto.getInsertDttm().toLocalDate());
        } else {

            order.setReservDt(LocalDate.now());
        }

        orderManageRepository.save(order);
    }


//    public void detail(OrderDetailDto orderDetailDto) {
//        return null;
//    }
}