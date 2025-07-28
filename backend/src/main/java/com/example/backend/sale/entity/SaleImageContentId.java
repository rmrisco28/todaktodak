package com.example.backend.sale.entity;

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
public class SaleImageContentId implements Serializable {
    private static final long serialVersionUID = -7870923561324903650L;
    @Column(name = "sale_no", nullable = false, length = 20)
    private String saleNo;

    @Column(name = "name", nullable = false, length = 300)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SaleImageContentId entity = (SaleImageContentId) o;
        return Objects.equals(this.name, entity.name) &&
                Objects.equals(this.saleNo, entity.saleNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, saleNo);
    }

}