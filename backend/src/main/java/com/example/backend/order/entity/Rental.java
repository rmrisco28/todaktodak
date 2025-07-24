package com.example.backend.order.entity;

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
@Table(name = "rental", schema = "prj4")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "rental_no", nullable = false, length = 20)
    private String rentalNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_no", nullable = false, referencedColumnName = "order_no")
    private OrderManage orderNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_no", nullable = false, referencedColumnName = "product_no")
    private Product productNo;


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
    private Boolean useYn = false;

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;

}