package com.example.backend.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductNameListDto {
    private Integer seq;
    private String productNo;
    private String name;
    private Integer stock;
    private Integer price;
}
