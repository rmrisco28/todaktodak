package com.example.backend.order.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "receive") // ✅ 매핑되는 테이블명
public class Receive {

    // ✅ 기본 키 (자동 증가)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    // ✅ 주문과의 연관 관계 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_manage_seq") // 외래 키: order_manage 테이블의 seq
    private OrderManage orderManage;

    // ✅ 수령 일시 (수령 확인 버튼을 누른 시각)
    private LocalDateTime receivedAt;

    // ✅ 수령자 회원 번호 (member 테이블의 memberNo와 매핑됨, 직접 참조)
    private String memberNo;

    // ✅ 수령 메모 (사용자가 수령 시 작성한 내용)
    private String memo;
}