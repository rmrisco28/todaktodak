package com.example.backend.order.repository;

import com.example.backend.order.entity.OrderManage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * ✅ 주문 기본 정보 (OrderManage) 엔티티에 대한 JPA 리포지토리
 * - order_manage 테이블에 대한 CRUD 처리를 담당합니다.
 */
public interface OrderManageRepository extends JpaRepository<OrderManage, Integer> {

    /**
     * ✅ 특정 회원(member.seq)에 해당하는 모든 주문 목록 조회
     * @param memberId 회원 PK (member 테이블의 seq 컬럼)
     * @return 해당 회원의 주문 리스트
     */
    List<OrderManage> findByMember_Seq(Integer memberId);

    /**
     * ✅ 주문 번호(PK)로 주문 정보 조회
     * @param orderManageSeq 주문 고유 식별 번호 (PK)
     * @return 해당 주문 정보
     */
    OrderManage findBySeq(Integer orderManageSeq);
}