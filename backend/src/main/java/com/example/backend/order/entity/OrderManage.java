package com.example.backend.order.entity;

import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name = "order_manage") // ✅ 매핑되는 테이블명
public class OrderManage {

    // ✅ 기본 키(PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    // ✅ 주문 고유 번호 (예: ORD20250731001)
    @Column(name = "order_no")
    private String orderNo;

    // ✅ 주문 생성일시
    @Column(name = "order_date")
    private LocalDateTime orderDate;

    // ✅ 총 결제 금액
    @Column(name = "total_price")
    private Integer totalPrice;

    // ✅ 주문 상태 (예: 결제완료, 배송중, 배송완료, 수령완료 등)
    private String status;

    // ✅ 송장번호 (배송 추적 번호)
    @Column(name = "track_no")
    private String trackNo;

    // ✅ 회원과의 관계 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_seq") // 외래키: member 테이블의 PK seq
    private Member member;

    // ✅ 주문에 속한 주문 상품 목록 (1:N)
    @OneToMany(mappedBy = "orderManage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    // ✅ 삭제 여부 (N: 삭제, Y: 삭제됨) — soft delete 구현 시 사용
    @Column(name = "del_yn")
    private String delYn;
}