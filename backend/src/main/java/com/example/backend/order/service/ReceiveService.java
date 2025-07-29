package com.example.backend.order.service;

import com.example.backend.order.dto.ReceiveRequestDto;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.entity.Receive;
import com.example.backend.order.repository.OrderManageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class ReceiveService {
}
//    private final OrderManageRepository orderManageRepository;
//    private final ReceiveRepository receiveRepository;
//
//    public void receive(ReceiveRequestDto dto) {
//        OrderManage orderManage = orderManageRepository.findById(dto.getOrderManageSeq())
//                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));
//
//        Receive receive = Receive.builder()
//                .orderManage(orderManage)
//                .receivedAt(LocalDateTime.now())
//                .receivedBy(dto.getReceivedBy())
//                .memo(dto.getMemo())
//                .build();
//
//        receiveRepository.save(receive);
//
//        // 선택적으로 주문 상태 변경도 병행할 수 있음
//        orderManage.setReceiveYn(true);
//        orderManageRepository.save(orderManage);
//    }
//}
