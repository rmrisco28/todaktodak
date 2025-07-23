package com.example.backend.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "product", schema = "prj4")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "product_no", nullable = false, length = 20)
    private String productNo;

    @Column(name = "category_top", nullable = false, length = 50)
    private String categoryTop;

    @Column(name = "category_mid", nullable = false, length = 50)
    private String categoryMid;

    @Column(name = "category_sub", nullable = false, length = 50)
    private String categorySub;

    @Column(name = "brand", nullable = false, length = 100)
    private String brand;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "standard", nullable = false)
    private String standard;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "note")
    private String note;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, updatable = false, insertable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;

    @Column(name = "state", nullable = false, length = 10)
    private String state;

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = false)
    private Boolean useYn = true;

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;

}