package com.example.backend.order.service;

import com.example.backend.order.dto.ReturnRequestDto;
import com.example.backend.order.entity.ReturnRequest;
import com.example.backend.order.repository.ReturnRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service // ✅ 해당 클래스가 비즈니스 로직을 수행하는 서비스 계층임을 Spring에 알림
@RequiredArgsConstructor // ✅ 생성자 주입을 Lombok이 자동 생성 (final 필드 대상)
public class ReturnService {

    // ✅ 반품 요청 저장을 위한 JPA Repository 주입
    private final ReturnRequestRepository returnRequestRepository;

    /**
     * 🔧 반품 신청 처리 메서드
     * - 클라이언트에서 전달된 DTO 데이터를 기반으로 엔티티를 생성하고 DB에 저장
     *
     * @param dto 클라이언트가 보낸 반품 신청 정보 (DTO)
     * @return 저장 성공 여부 (현재는 항상 true 반환)
     */
    public boolean processReturn(ReturnRequestDto dto) {
        // ✅ DTO → Entity 매핑
        ReturnRequest entity = new ReturnRequest();
        entity.setOrderNumber(dto.getOrderNo());      // 주문 번호
        entity.setProductCode(dto.getProductNo());    // 상품 코드
        entity.setReason(dto.getReason());            // 반품 사유
        entity.setCustomerName(dto.getCustomerName()); // 고객 이름
        entity.setPhoneNumber(dto.getPhone());        // 고객 연락처

        // ✅ DB에 저장
        returnRequestRepository.save(entity);

        return true; // TODO: 향후 저장 실패 처리 및 예외 분기 로직 추가 가능
    }
}