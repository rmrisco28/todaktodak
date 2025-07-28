package com.example.backend.order.service;

import com.example.backend.order.dto.OrderSummaryDto;
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
@Transactional(readOnly = true)
public class OrderService {

    private final OrderManageRepository orderManageRepository;

    public List<OrderSummaryDto> findOrders(
            Integer memberSeq,
            String status,
            String keyword,
            LocalDate startDate,
            LocalDate endDate
    ) {
        // 주문 목록 가져오기
        List<OrderManage> orderManages = orderManageRepository.findByMember_Seq(memberSeq);

        return orderManages.stream()
                .filter(order -> status == null || status.isBlank() || order.getStatus().equals(status))
                .filter(order -> startDate == null || !order.getOrderDate().toLocalDate().isBefore(startDate))
                .filter(order -> endDate == null || !order.getOrderDate().toLocalDate().isAfter(endDate))
                .filter(order -> {
                    if (keyword == null || keyword.isBlank()) return true;
                    return order.getItems().stream()
                            .anyMatch(item -> item.getProduct() != null &&
                                    item.getProduct().getName() != null &&
                                    item.getProduct().getName().contains(keyword));
                })
                .map(order -> new OrderSummaryDto(
                        order.getSeq(),
                        order.getOrderDate(),
                        order.getItems().stream()
                                .map(item -> item.getProduct().getName())
                                .collect(Collectors.joining(", ")),
                        order.getTotalPrice(),
                        order.getStatus(),
                        order.getTrackingNumber()
                ))
                .collect(Collectors.toList());
    }
}