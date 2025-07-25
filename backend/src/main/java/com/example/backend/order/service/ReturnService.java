package com.example.backend.order.service;

import com.example.backend.member.repository.Member2Repository;
import com.example.backend.order.dto.ReturnAddDto;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.entity.Rental;
import com.example.backend.order.repository.OrderManageRepository;
import com.example.backend.order.repository.RentalRepository;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReturnService {

    private final OrderManageRepository orderManageRepository;
    private final ProductRepository productRepository;
    private final RentalRepository rentalRepository;

    public void add(ReturnAddDto dto) {
        ZoneId zoneId = ZoneId.of("Asia/Seoul");

        Rental rental = new Rental();

        rental.setRentalNo(dto.getRentalNo());
        rental.setState(dto.getState());

        if (dto.getInsertDttm() != null) {
            rental.setInsertDttm(dto.getInsertDttm().atZone(zoneId).toInstant());
        } else {
            rental.setInsertDttm(Instant.now());
        }

        if (dto.getUpdateDttm() != null) {
            rental.setUpdateDttm(dto.getUpdateDttm().atZone(zoneId).toInstant());
        } else {
            rental.setUpdateDttm(Instant.now());
        }

        OrderManage order = orderManageRepository.findByName(dto.getOrderName());

        Product product = productRepository.findByProductNo(dto.getProductNo());

        rental.setOrderNo(order);
        rental.setProductNo(product);

        rentalRepository.save(rental);
//        public void add(ReturnAddDto dto) {
//    Rental rental = new Rental();
//    rental.setRentalNo(dto.getRentalNo());
//    rental.setState(dto.getState());
//
//    ZoneId zoneId = ZoneId.of("Asia/Seoul");
//    rental.setInsertDttm(dto.getInsertDttm().atZone(zoneId).toInstant());
//    rental.setUpdateDttm(dto.getUpdateDttm().atZone(zoneId).toInstant());
//
//    // 연관 엔티티 가져오기
//    rental.setOrderNo(orderRepository.findByName(dto.getOrderName()).orElseThrow());
//    rental.setProductNo(productRepository.findByProductNo(dto.getProductNo()).orElseThrow());
//
//    rentalRepository.save(rental);
//}
    }
}
