package com.example.backend.sale.entity;

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
@Table(name = "sale_image_thumb", schema = "prj4")
public class SaleImageThumb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sale_no", referencedColumnName = "sale_no")
    private Sale saleNo;

    @Column(name = "name", length = 300)
    private String name;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, updatable = false, insertable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;

}