package com.example.backend.order.service;

import com.example.backend.order.dto.ReturnRequestDto;
import com.example.backend.order.entity.ReturnRequest;
import com.example.backend.order.repository.ReturnRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReturnService {

    private final ReturnRequestRepository returnRequestRepository;

    public boolean processReturn(ReturnRequestDto dto) {
        ReturnRequest entity = new ReturnRequest();
        entity.setOrderNumber(dto.getOrderNo());
        entity.setProductCode(dto.getProductNo());
        entity.setReason(dto.getReason());
        entity.setCustomerName(dto.getCustomerName());
        entity.setPhoneNumber(dto.getPhone());

        returnRequestRepository.save(entity);
        return true;
    }
}