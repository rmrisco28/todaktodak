package com.example.backend.order.entity;

import com.example.backend.sale.entity.Sale;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "order_info", schema = "prj4")
public class OrderInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "order_no", nullable = false, length = 20)
    private String orderNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sale_no", nullable = false, referencedColumnName = "sale_no")
    private Sale saleNo;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "phone_no", nullable = false, length = 30)
    private String phoneNo;

    @Column(name = "post_code", nullable = false, length = 10)
    private String postCode;

    @Column(name = "addr", nullable = false)
    private String addr;

    @Column(name = "addr_detail", nullable = false)
    private String addrDetail;

    @Column(name = "request", nullable = false)
    private String request;

    @Column(name = "order_count", nullable = false)
    private Integer orderCount;

//    @Column(name = "member_no", nullable = false, length = 20)
//    private String memberNo;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "delivery_fee", nullable = false)
    private Integer deliveryFee;


}