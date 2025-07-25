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
import org.springframework.security.core.Authentication;
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

    public void add(ReturnAddDto returnAddDto) {
        Rental rental = new Rental();

        rental.setRentalNo(returnAddDto.getRentalNo());
        rental.setState(returnAddDto.getState());
        rental.setInsertDttm(returnAddDto.getInsertDttm());
        rental.setUpdateDttm(returnAddDto.getUpdateDttm());
        OrderManage odrName = orderManageRepository.findByName(returnAddDto.getOdrName()).get();
        rental.setOrderNo(odrName);
        Product productName = productRepository.findByName(returnAddDto.getProductName()).get();
        rental.setProductNo(productName);
        Product note = productRepository.

                rentalRepository.save(rental);

//    // 연관 엔티티 가져오기
//    rental.setOrderNo(orderRepository.findByName(returnAddDto.getOrderName()).orElseThrow());
//    rental.setProductNo(productRepository.findByProductNo(returnAddDto.getProductNo()).orElseThrow());
//
//    rentalRepository.save(rental);
//}
    }
}
