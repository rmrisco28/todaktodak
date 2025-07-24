package com.example.backend.order.service;

import com.example.backend.member.repository.Member2Repository;
import com.example.backend.order.dto.ReturnAddDto;
import com.example.backend.order.entity.Rental;
import com.example.backend.order.repository.RentalRepository;
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

    private final Member2Repository member2Repository;
    private final RentalRepository rentalRepository;

    public List<ReturnAddDto> getList() {

        ZoneId zoneId = ZoneId.of("Asia/Seoul");

        return rentalRepository.findAll().stream()
                .map(rental -> {
                    LocalDateTime insertTime = LocalDateTime.ofInstant(
                            rental.getInsertDttm(), zoneId);
                    LocalDateTime updateTime = LocalDateTime.ofInstant(
                            rental.getUpdateDttm(), zoneId);

                    return ReturnAddDto.builder()
                            .id(rental.getId())
                            .rentalNo(rental.getRentalNo())
                            .state(rental.getState())
                            .insertDttm(insertTime)
                            .updateDttm(updateTime)
                            .orderName(rental.getOrderNo().getName())
                            .productNo(rental.getProductNo().getProductNo())
                            .note(rental.getProductNo().getNote())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
