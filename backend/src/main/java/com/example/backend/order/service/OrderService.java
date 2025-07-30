package com.example.backend.order.service;

import com.example.backend.order.dto.OrderDetailDto;
import com.example.backend.order.dto.OrderManageDto;
import com.example.backend.order.entity.OrderItem;
import com.example.backend.order.entity.OrderManage;
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

    // 주문 목록 조회
    public List<OrderManageDto> findOrders(
            Integer memberSeq,
            String status,
            String keyword,
            LocalDate startDate,
            LocalDate endDate
    ) {
        // 해당 회원의 모든 주문 가져오기
        List<OrderManage> orderManages = orderManageRepository.findByMember_Seq(memberSeq);
        List<OrderManageDto> result = new ArrayList<>();

        for (OrderManage order : orderManages) {
            boolean matches = true;

            // 상태 필터
            if (status != null && !status.isBlank()) {
                if (!status.equals(order.getStatus())) {
                    matches = false;
                }
            }

            // 시작일 필터
            if (startDate != null) {
                if (order.getOrderDate().toLocalDate().isBefore(startDate)) {
                    matches = false;
                }
            }

            // 종료일 필터
            if (endDate != null) {
                if (order.getOrderDate().toLocalDate().isAfter(endDate)) {
                    matches = false;
                }
            }

            // 키워드(상품명 포함 여부) 필터
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

            // 모든 조건이 통과된 주문만 DTO로 변환
            if (matches) {
                List<String> names = new ArrayList<>();
                for (OrderItem item : order.getItems()) {
                    if (item.getProduct() != null && item.getProduct().getName() != null) {
                        names.add(item.getProduct().getName());
                    }
                }

                String productNames = String.join(", ", names);

                // DTO 생성 및 결과 리스트에 추가
                OrderManageDto dto = new OrderManageDto(
                        order.getSeq(),
                        order.getOrderNo(),
                        order.getOrderDate(),
                        productNames,
                        order.getTotalPrice(),
                        order.getStatus(),
                        order.getTrackNo(),
                        order.getDelYn()
                );

                result.add(dto);
            }
        }

        return result;
    }

    // 주문 상세 조회
    public OrderDetailDto getOrderDetail(Integer orderSeq) {
        // 주문 정보 조회
        OrderManage order = orderManageRepository.findById(orderSeq).orElse(null);

        // 해당 주문에 속한 주문 항목 조회
        List<OrderItem> items = orderItemRepository.findByOrderManage(order);

        // 상세에 들어갈 데이터 수집
        List<String> productNames = new ArrayList<>();
        List<Integer> quantities = new ArrayList<>();
        List<Integer> prices = new ArrayList<>();

        for (OrderItem item : items) {
            productNames.add(item.getProduct().getName());
            quantities.add(item.getQuantity());
            prices.add(item.getProduct().getPrice());
        }

        // 상세 DTO 반환
        return new OrderDetailDto(
                order.getSeq(),
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