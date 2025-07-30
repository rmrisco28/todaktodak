package com.example.backend.order.service;

import com.example.backend.order.dto.ReceiveRequestDto;
import com.example.backend.order.dto.ReceiveResponseDto;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.entity.Receive;
import com.example.backend.order.repository.OrderManageRepository;
import com.example.backend.order.repository.ReceiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReceiveService {

    private final OrderManageRepository orderManageRepository;
    private final ReceiveRepository receiveRepository;

    /**
     * 수령 정보 조회 (ReceiveForm)
     */
    public ReceiveResponseDto getReceiveInfo(Integer seq) {
        OrderManage order = orderManageRepository.findBySeq(seq);
        if (order == null) {
            throw new IllegalArgumentException("주문 정보를 찾을 수 없습니다.");
        }

        Receive receive = receiveRepository.findBySeq(seq);

        ReceiveResponseDto dto = new ReceiveResponseDto();
        dto.setProductName(order.getOrderNo()); // 필요 시 상품명 등으로 수정
        dto.setAddress("주소 정보 없음"); // OrderManage에 주소 필드 없으므로 placeholder
        dto.setStatus(order.getStatus());
        dto.setOrderDate(order.getOrderDate().toString());

        if (receive != null) {
            dto.setReceivedAt(receive.getReceivedAt());
            dto.setMemberNo(receive.getMemberNo());
            dto.setMemo(receive.getMemo());
        }

        return dto;
    }

    /**
     * 수령 처리 실행 (ReceiveExec)
     */
    public void receiveExec(ReceiveRequestDto dto) {
        OrderManage order = orderManageRepository.findBySeq(dto.getSeq());
        if (order == null) {
            throw new IllegalArgumentException("주문 정보를 찾을 수 없습니다.");
        }

        Receive receive = Receive.builder()
                .orderManage(order)
                .receivedAt(LocalDateTime.now())
                .memberNo(dto.getMemberNo())
                .memo(dto.getMemo())
                .build();

        receiveRepository.save(receive);
    }
}