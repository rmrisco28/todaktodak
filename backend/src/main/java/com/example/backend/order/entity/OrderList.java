package com.example.backend.order.entity;

import com.example.backend.sale.entity.Sale;
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
@Table(name = "order_list", schema = "prj4")
public class OrderList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "order_no", nullable = false, length = 20)
    private String orderNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sale_no", nullable = false, referencedColumnName = "sale_no")
    private Sale sale;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "recipient", nullable = false, length = 50)
    private String recipient;

    @Column(name = "phone", nullable = false, length = 30)
    private String phone;

    @Column(name = "post", nullable = false, length = 10)
    private String post;

    @Column(name = "addr", nullable = false)
    private String addr;

    @Column(name = "addr_detail", nullable = false)
    private String addrDetail;

    @Column(name = "request")
    private String request;

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;

    @Column(name = "delivery_fee", nullable = false)
    private Integer deliveryFee;

    @Column(name = "tot_prod_price", nullable = false)
    private Integer totProdPrice;

    @Column(name = "prod_price", nullable = false)
    private Integer prodPrice;

    @Column(name = "order_count", nullable = false)
    private Integer orderCount;

    @Column(name = "rental_period", nullable = false)
    private Integer rentalPeriod;

    @Column(name = "state", nullable = false, length = 10)
    private String state;

    @Column(name = "delivery_company", nullable = false, length = 50)
    private String deliveryCompany;

    @Column(name = "tracking", nullable = false, length = 100)
    private String tracking;

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