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
@Table(name = "product_image", schema = "prj4")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @ManyToOne
    @JoinColumn(name = "product_no", referencedColumnName = "product_no")
    private Product productNo;

    @Column(name = "name", length = 300)
    private String name;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, updatable = false, insertable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;

}