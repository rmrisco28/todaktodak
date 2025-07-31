package com.example.backend.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "auth", schema = "prj4")
public class Auth {
    @EmbeddedId
    private AuthId id;

    @MapsId("memberId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "member_id", nullable = false, referencedColumnName = "member_id")
    private Member member;

}