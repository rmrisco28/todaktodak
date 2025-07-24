package com.example.backend.order.service;

import com.example.backend.order.dto.OrderDto;
import com.example.backend.order.dto.OrderListDto;
import com.example.backend.order.dto.OrderManageDto;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.repository.OrderManageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderManageRepository orderManageRepository;

//    public static Map<String, Object> list(String keyword, Integer pageNumber) {
//        Page<OrderListDto> boardListDtoPage
//                = OrderManageRepository.findAllBy(keyword, PageRequest.of(pageNumber - 1, 10));
//
//        int totalPages = boardListDtoPage.getTotalPages(); // 마지막 페이지
//        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
//        int leftPageNumber = rightPageNumber - 9;
//        rightPageNumber = Math.min(rightPageNumber, totalPages);
//        leftPageNumber = Math.max(leftPageNumber, 1);
//
//        var pageInfo = Map.of("totalPages", totalPages,
//                "rightPageNumber", rightPageNumber,
//                "leftPageNumber", leftPageNumber,
//                "currentPageNumber", pageNumber);
//
//        return Map.of("pageInfo", pageInfo,
//                "boardList", boardListDtoPage.getContent());
//    }


//    public List<OrderListDto> getList() {
//        return orderManageRepository.findAll().stream()
//                .map(order -> OrderListDto.builder()
//                        .odrName(order.getName())
//                        .orderState(order.getState())
//                        .orderOption(order.getOrderOption())
//                        .count(order.getCount())
//                        .totalPrice(order.getTotalPrice())
//                        .insertDttm(order.getInsertDttm())
//                        .updateDttm(order.getUpdateDttm())
//                        .build()
//                )
//                .collect(Collectors.toList());
//    }


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

//    public void update(OrderManageDto OrderManageDto, Authentication authentication) {
//        if (authentication == null) {
//            throw new RuntimeException("권한이 없습니다.");
//        }
//
//        OrderManage db = orderManageRepository.findById(OrderManageDto.getSeq()).get();
//
//
//        if (db.getName().equals(authentication.getName())) {
//            db.
//
//                    orderManageRepository.save(db);
//
//        } else {
//            throw new RuntimeException("권한이 없습니다.");
//        }
//    }
//
//    public boolean validateForUpdate(OrderManageDto boardDto) {
//
//    }
//
//    public void deleteById(Integer id, Authentication authentication) {
//
//    }
//
//    public OrderManageDto getOrderById(Integer id) {
//
//    }
}