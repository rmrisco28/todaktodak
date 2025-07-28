package com.example.backend.product.entity;

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
public class ProductImageId implements Serializable {
    private static final long serialVersionUID = 954280720344478358L;
    @Column(name = "product_no", nullable = false, length = 20)
    private String productNo;

    @Column(name = "name", nullable = false, length = 300)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProductImageId entity = (ProductImageId) o;
        return Objects.equals(this.name, entity.name) &&
                Objects.equals(this.productNo, entity.productNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, productNo);
    }

}