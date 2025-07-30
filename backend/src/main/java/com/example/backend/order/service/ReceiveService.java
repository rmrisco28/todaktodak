package com.example.backend.order.service;

import com.example.backend.order.dto.ReceiveRequestDto;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.entity.Receive;
import com.example.backend.order.repository.OrderManageRepository;
import com.example.backend.order.repository.ReceiveRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class ReceiveService {

    private final OrderManageRepository orderManageRepository;
    private final ReceiveRepository receiveRepository;

    public void receive(ReceiveRequestDto dto) {
        OrderManage orderManage = orderManageRepository.findBySeq(dto.getOrderManageSeq());

        Receive receive = Receive.builder()
                .orderManage(orderManage)
                .receivedAt(LocalDateTime.now())
                .receivedBy(dto.getReceivedBy())
                .memo(dto.getMemo())
                .build();

        receiveRepository.save(receive);

        orderManageRepository.save(orderManage);
    }
}
