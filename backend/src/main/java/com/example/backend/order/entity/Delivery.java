package com.example.backend.order.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@ToString
@Entity
@Table(name = "delivery", schema = "prj4")
public class Delivery {
    @Id
    @Column(name = "seq", nullable = false)
    private Integer id; // 고유 식별자

    @Column(name = "delivery_no", nullable = false, length = 20)
    private String deliveryNo;  // 배송사 코드

    @Column(name = "name", nullable = false, length = 50)
    private String name;    // 배송사 이름

    @Column(name = "tel", nullable = false, length = 15)
    private String tel; // 배송사 대표 전화번호?

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "insert_dttm", nullable = false)
    private Instant insertDttm; // 생성 일시

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "update_dttm", nullable = false)
    private Instant updateDttm; // 수정 일시

    @Column(name = "state", nullable = false, length = 10)
    private String state;   // 상태

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = false)
    private Boolean useYn = false;  // 사용 여부

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;  // 삭제 여부

}