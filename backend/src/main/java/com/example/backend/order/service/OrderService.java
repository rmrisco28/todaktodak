package com.example.backend.order.service;

import com.example.backend.order.dto.OrderDetailDto;
import com.example.backend.order.dto.OrderManageDto;
import com.example.backend.order.entity.OrderItem;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.repository.OrderInfoRepository;
import com.example.backend.order.repository.OrderItemRepository;
import com.example.backend.order.repository.OrderManageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderManageRepository orderManageRepository;
    private final OrderItemRepository orderItemRepository;

    public List<OrderManageDto> findOrders(
            Integer memberSeq,
            String status,
            String keyword,
            LocalDate startDate,
            LocalDate endDate
    ) {
        List<OrderManage> orderManages = orderManageRepository.findByMember_Seq(memberSeq);
        List<OrderManageDto> result = new ArrayList<>();

        for (OrderManage order : orderManages) {
            boolean matches = true;

            if (status != null && !status.isBlank()) {
                if (!status.equals(order.getStatus())) {
                    matches = false;
                }
            }

            if (startDate != null) {
                if (order.getOrderDate().toLocalDate().isBefore(startDate)) {
                    matches = false;
                }
            }

            if (endDate != null) {
                if (order.getOrderDate().toLocalDate().isAfter(endDate)) {
                    matches = false;
                }
            }

            if (keyword != null && !keyword.isBlank()) {
                boolean found = false;
                for (OrderItem item : order.getItems()) {
                    if (item.getProduct() != null && item.getProduct().getName() != null) {
                        if (item.getProduct().getName().contains(keyword)) {
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    matches = false;
                }
            }

            if (matches) {
                String productNames = "";
                List<String> names = new ArrayList<>();
                for (OrderItem item : order.getItems()) {
                    if (item.getProduct() != null && item.getProduct().getName() != null) {
                        names.add(item.getProduct().getName());
                    }
                }
                productNames = String.join(", ", names);

                OrderManageDto dto = new OrderManageDto(
                        order.getSeq(),
                        order.getOrderNo(),
                        order.getOrderDate(),
                        productNames,
                        order.getTotalPrice(),
                        order.getStatus(),
                        order.getTrackNo()
                );

                result.add(dto);
            }
        }

        return result;
    }

    public OrderDetailDto getOrderDetail(Integer orderSeq) {
        OrderManage order = orderManageRepository.findById(orderSeq).orElse(null);

        List<OrderItem> items = orderItemRepository.findByOrderManage(order);

        List<String> productNames = new ArrayList<>();
        List<Integer> quantities = new ArrayList<>();
        List<Integer> prices = new ArrayList<>();

        for (OrderItem item : items) {
            productNames.add(item.getProduct().getName());
            quantities.add(item.getQuantity());
            prices.add(item.getProduct().getPrice());
        }

        return new OrderDetailDto(
                order.getOrderNo(),
                order.getOrderDate(),
                productNames,
                quantities,
                prices,
                order.getTotalPrice(),
                order.getStatus(),
                order.getTrackNo()
        );
    }
}