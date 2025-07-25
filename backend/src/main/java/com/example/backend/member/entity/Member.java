package com.example.backend.member.entity;

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
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "member_no", nullable = false, length = 20)
    private String memberNo;

    @Column(name = "auth", length = 20)
    private String auth;

    @Column(name = "member_id", nullable = false, length = 120)
    private String memberId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "addr", nullable = false)
    private String addr;

    @Column(name = "addr_detail", nullable = false)
    private String addrDetail;

    @Column(name = "post_code", nullable = false, length = 10)
    private String postCode;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false)
    private LocalDateTime updateDttm;


    @Column(name = "state", length = 10)
    private String state = "use";

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = false)
    private Boolean useYn = true;

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;

}