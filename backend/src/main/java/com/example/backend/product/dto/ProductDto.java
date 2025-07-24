package com.example.backend.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Integer seq;
    private String productNo;
    private String category;
    private String brand;
    private String name;
    private String standard;
    private Integer stock;
    private Integer price;
    private String note;
    private LocalDateTime insertDttm;
    private LocalDateTime updateDttm;
    private String state;
    private Boolean useYn;

    private List<ProductImageDto> images;

    public ProductDto(Integer seq, String productNo, String category, String brand, String name, String standard, Integer stock, Integer price, String note, LocalDateTime insertDttm, LocalDateTime updateDttm, String state, Boolean useYn) {
        this.seq = seq;
        this.productNo = productNo;
        this.category = category;
        this.brand = brand;
        this.name = name;
        this.standard = standard;
        this.stock = stock;
        this.price = price;
        this.note = note;
        this.insertDttm = insertDttm;
        this.updateDttm = updateDttm;
        this.state = state;
        this.useYn = useYn;
    }
}
