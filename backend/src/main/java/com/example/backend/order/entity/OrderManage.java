package com.example.backend.order.entity;

import com.example.backend.product.entity.Product;
import com.example.backend.product.entity.Sale;
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
    private Integer seq;

    @Column(name = "order_no", nullable = false, length = 20)
    private String orderNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sale_no", nullable = false, referencedColumnName = "sale_no")
    private Sale saleNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_no", nullable = false, referencedColumnName = "product_no")
    private Product productNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "delivery_no", nullable = false, referencedColumnName = "delivery_no")
    private Delivery deliveryNo;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "order_option")
    private String orderOption;

    @Column(name = "count", nullable = false)
    private Integer count;

    @Column(name = "days", nullable = false)
    private Integer days;

    @Column(name = "reserv_dt", nullable = false)
    private LocalDate reservDt;

    @Column(name = "delivery_fee", nullable = false)
    private Integer deliveryFee;

    @Column(name = "total_prod_price", nullable = false)
    private Integer totalProdPrice;

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;

    @Column(name = "track_no", length = 50)
    private String trackNo;

    @Column(name = "state", nullable = false, length = 10)
    private String state;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, updatable = false, insertable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;

}