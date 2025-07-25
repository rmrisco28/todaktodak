package com.example.backend.order.entity;

import com.example.backend.product.entity.Product;
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
@Table(name = "product_order", schema = "prj4")
public class ProductOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_no", referencedColumnName = "product_no")
    private Product productNo;

    @ManyToOne
    @JoinColumn(name = "member_no", referencedColumnName = "member_no")
    private Member memberNo;

    @Column(name = "orderer_name")
    private String ordererName;

    @Column(name = "rental_date")
    private LocalDate rentalDate;

    @Column(name = "count")
    private Integer count;

    @Column(name = "state")
    private String state;

    @Column(name = "use_yn")
    private Boolean useYn;

    @Column(name = "del_yn")
    private Boolean delYn;

    @Column(name = "insert_dttn")
    private LocalDateTime insertDttn;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttn")
    private LocalDateTime updateDttn;

}