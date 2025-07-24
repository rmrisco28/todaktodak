package com.example.backend.order.entity;

import com.example.backend.product.entity.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "order_manage", schema = "prj4")
public class OrderManage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;    // 고유 번호

    @Column(name = "order_no", nullable = false, length = 20)
    private String orderNo; // 주문 번호

//    @ManyToOne(optional = false)
//    @JoinColumn(name = "sale_no", nullable = false, referencedColumnName = "sale_no")
//    private Sale saleNo;  // 판매 번호

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_no", nullable = false, referencedColumnName = "product_no")
    private Product productNo;  // 상품 번호

    @ManyToOne(optional = false)
    @JoinColumn(name = "delivery_no", nullable = false, referencedColumnName = "delivery_no")
    private Delivery deliveryNo;    // 배송 번호

    @Column(name = "name", nullable = false, length = 50)
    private String name;    // 주문자 이름

    @Column(name = "order_option")
    private String orderOption; // 상품 옵션 정보

    @Column(name = "count", nullable = false)
    private Integer count;  // 상품 갯수

    @Column(name = "days", nullable = false)
    private Integer days;   // 주문과 관련된 기간

    @Column(name = "reserv_dt", nullable = false)
    private LocalDate reservDt; // 배송 날짜

    @Column(name = "delivery_fee", nullable = false)
    private Integer deliveryFee;    // 배송비

    @Column(name = "total_prod_price", nullable = false)
    private Integer totalProdPrice; // 상품 총 가격

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice; // 최종 결정 금액

    @Column(name = "track_no", length = 50)
    private String trackNo; //운송장 번호

    @Column(name = "state", nullable = false, length = 10)
    private String state;   // 주문 상태

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, updatable = false, insertable = false)
    private LocalDateTime insertDttm;   // 주문 레코드가 등록된 날짜/시간

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;   // 주문 레코드가 마지막 수정된 날짜/시간

}