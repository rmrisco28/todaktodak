package com.example.backend.order.repository;

import com.example.backend.order.entity.Receive;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ✅ 상품 수령 정보(Receive) 엔티티를 위한 JPA 리포지토리
 * - receive 테이블의 CRUD 처리를 담당합니다.
 */
public interface ReceiveRepository extends JpaRepository<Receive, Integer> {

    /**
     * ✅ 수령 정보 단건 조회
     * @param seq 수령 정보의 기본키 (PK)
     * @return 해당 seq에 대한 수령 정보 엔티티
     */
    Receive findBySeq(Integer seq);
}