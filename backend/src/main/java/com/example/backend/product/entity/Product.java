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
    private Integer id;

    @Column(name = "product_no", nullable = false, length = 20)
    private String productNo;

    @Column(name = "category", length = 50)
    private String category;

    @Column(name = "brand", length = 100)
    private String brand;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "standard")
    private String standard;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "price")
    private Integer price;

    @Column(name = "note")
    private String note;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, updatable = false, insertable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;

    @Column(name = "state", length = 10)
    private String state;

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = false)
    private Boolean useYn = false;

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;

}