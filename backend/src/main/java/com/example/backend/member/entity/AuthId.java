package com.example.backend.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@Embeddable
public class AuthId implements Serializable {
    private static final long serialVersionUID = 871607776598583206L;
    @Column(name = "member_id", nullable = false)
    private String memberId;

    @Column(name = "auth_name", nullable = false)
    private String authName;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AuthId entity = (AuthId) o;
        return Objects.equals(this.authName, entity.authName) &&
                Objects.equals(this.memberId, entity.memberId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(authName, memberId);
    }

}