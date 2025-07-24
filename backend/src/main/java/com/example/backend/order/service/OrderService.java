package com.example.backend.order.service;

import com.example.backend.order.dto.DeliveryListDto;
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


    public List<OrderListDto> getOrderList() {
        return orderManageRepository.findAll().stream()
                .map(order -> OrderListDto.builder()
                        .seq(order.getSeq())
                        .orderNo(order.getOrderNo())
                        .orderOption(order.getOrderOption())
                        .orderDate(order.getInsertDttm())
                        .build()
                )
                .collect(Collectors.toList());
    }


    public void saveOrder(OrderListDto orderListDto) {
        OrderManage order = new OrderManage();
        order.setOrderNo(orderListDto.getOrderNo());
        order.setOrderOption(orderListDto.getOrderOption());

        if (orderListDto.getOrderDate() != null) {
            order.setReservDt(orderListDto.getOrderDate().toLocalDate());
        } else {

            order.setReservDt(LocalDate.now());
        }

        orderManageRepository.save(order);
    }

    public List<OrderListDto> getList() {

        return null;
    }

    public void save(OrderListDto orderListDto) {
    }

    public void deliveryList(DeliveryListDto deliveryListDto) {
    }
}