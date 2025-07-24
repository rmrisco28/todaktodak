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
    private Integer id;

    @Column(name = "delivery_no", nullable = false, length = 20)
    private String deliveryNo;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "tel", nullable = false, length = 15)
    private String tel;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "insert_dttm", nullable = false)
    private Instant insertDttm;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "update_dttm", nullable = false)
    private Instant updateDttm;

    @Column(name = "state", nullable = false, length = 10)
    private String state;

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = false)
    private Boolean useYn = false;

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;

}