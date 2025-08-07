package com.example.backend.rental.entity;

import com.example.backend.order.entity.OrderList;
import com.example.backend.product.entity.Product;
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
@Table(name = "return_order", schema = "prj4")
public class ReturnOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "return_no", nullable = false, length = 20)
    private String returnNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "rental_no", nullable = false, referencedColumnName = "rental_no")
    private Rental rentalNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sale_no", nullable = false, referencedColumnName = "sale_no")
    private Sale saleNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_no", nullable = false, referencedColumnName = "product_no")
    private Product productNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_no", nullable = false, referencedColumnName = "order_no")
    private OrderList orderNo;

    @Column(name = "post", nullable = false, length = 10)
    private String post;

    @Column(name = "addr", nullable = false)
    private String addr;

    @Column(name = "addr_detail", nullable = false)
    private String addrDetail;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "phone", nullable = false, length = 30)
    private String phone;

    @Column(name = "content", nullable = false, length = 1000)
    private String content;

    @ColumnDefault("반납 확인중")
    @Column(name = "state", nullable = false, length = 10)
    private String state = "반납 확인중";

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;

}