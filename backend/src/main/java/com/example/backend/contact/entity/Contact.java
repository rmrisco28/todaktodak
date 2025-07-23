package com.example.backend.contact.entity;

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
@Table(name = "contact", schema = "prj4")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @ColumnDefault("0")
    @Column(name = "view")
    private Integer view;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime insertDttm;

}