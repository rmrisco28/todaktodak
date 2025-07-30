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

@Service // ✅ 비즈니스 로직을 수행하는 서비스 클래스임을 명시
@RequiredArgsConstructor // ✅ 생성자 주입 자동 생성 (final 필드 대상)
public class ReceiveService {

    private final OrderManageRepository orderManageRepository; // 주문 정보 조회/저장용
    private final ReceiveRepository receiveRepository;         // 수령 정보 저장/조회용

    /**
     * 📌 수령 정보 조회
     * - 수령 확인 화면(ReceiveForm)에서 사용
     * - 주문 번호 기반으로 주문 및 수령 데이터를 불러와 DTO로 가공하여 반환
     *
     * @param seq 주문 관리 번호 (order_manage.seq)
     * @return ReceiveResponseDto (수령 화면 출력용 정보)
     */
    public ReceiveResponseDto getReceiveInfo(Integer seq) {
        // 🔍 주문 정보 조회
        OrderManage order = orderManageRepository.findBySeq(seq);
        if (order == null) {
            throw new IllegalArgumentException("주문 정보를 찾을 수 없습니다.");
        }

        // 🔍 수령 정보 조회 (있을 수도 없을 수도 있음)
        Receive receive = receiveRepository.findBySeq(seq);

        // 📦 화면에 전달할 응답 DTO 구성
        ReceiveResponseDto dto = new ReceiveResponseDto();
        dto.setProductName(order.getOrderNo()); // TODO: 상품명이 필요하면 수정 필요
        dto.setAddress("주소 정보 없음"); // ⚠ OrderManage에 주소 필드 없음 → 임시 값
        dto.setStatus(order.getStatus()); // 주문 상태 (ex: 배송완료, 수령완료)
        dto.setOrderDate(order.getOrderDate().toString());

        if (receive != null) {
            // 수령 기록이 있는 경우 → 해당 정보 세팅
            dto.setReceivedAt(receive.getReceivedAt());
            dto.setMemberNo(receive.getMemberNo());
            dto.setMemo(receive.getMemo());
        }

        return dto;
    }

    /**
     * 📌 수령 처리 실행
     * - 수령 확인 버튼 클릭 시 호출되는 기능
     * - 수령 내역을 저장하고, 주문 정보와 연결
     *
     * @param dto 클라이언트가 전달한 수령 정보 (orderManageSeq, memberNo, memo 등)
     */
    public void receiveExec(ReceiveRequestDto dto) {
        // 🔍 주문 정보 조회
        OrderManage order = orderManageRepository.findBySeq(dto.getSeq());
        if (order == null) {
            throw new IllegalArgumentException("주문 정보를 찾을 수 없습니다.");
        }

        // ✅ 수령 정보 객체 생성 및 저장
        Receive receive = Receive.builder()
                .orderManage(order)                 // 주문 객체 연결 (외래키)
                .receivedAt(LocalDateTime.now())    // 현재 시각 저장
                .memberNo(dto.getMemberNo())        // 수령한 회원 번호
                .memo(dto.getMemo())                // 수령 메모
                .build();

        receiveRepository.save(receive);
    }
}