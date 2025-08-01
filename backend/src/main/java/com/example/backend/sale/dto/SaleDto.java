package com.example.backend.sale.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDto {
    private Integer seq;
    private String saleNo;
    private String productNo;
    private String category;
    private String title;
    private Integer Quantity;
    private Integer salePrice;
    private Integer deliveryFee;
    private String content;
    private LocalDateTime insertDttm;
    private LocalDateTime updateDttm;
    private Boolean useYn;

    private List<SaleImageThumbDto> thumbnails;
    private List<SaleImageContentDto> contentImages;

    public SaleDto(Integer seq, String saleNo, String productNo, String category, String title, Integer quantity, Integer salePrice, Integer deliveryFee, String content, LocalDateTime insertDttm, LocalDateTime updateDttm, Boolean useYn) {
        this.seq = seq;
        this.saleNo = saleNo;
        this.productNo = productNo;
        this.category = category;
        this.title = title;
        Quantity = quantity;
        this.salePrice = salePrice;
        this.deliveryFee = deliveryFee;
        this.content = content;
        this.insertDttm = insertDttm;
        this.updateDttm = updateDttm;
        this.useYn = useYn;
    }
}
