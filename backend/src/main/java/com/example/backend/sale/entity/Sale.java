package com.example.backend.sale.entity;

import com.example.backend.product.entity.Product;
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
@Table(name = "sale", schema = "prj4")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "sale_no", nullable = false, length = 20)
    private String saleNo;

    @ManyToOne
    @JoinColumn(name = "product_no", referencedColumnName = "product_no")
    private Product productNo;

    @Column(name = "category", length = 20)
    private String category;

    @Column(name = "title")
    private String title;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "sale_price")
    private Integer salePrice;

    @Column(name = "delivery_fee")
    private Integer deliveryFee;

    @Column(name = "content", length = 10000)
    private String content;

    @Column(name = "view")
    private Integer view;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = false)
    private Boolean useYn = true;

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;

}