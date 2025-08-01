package com.example.backend.sale.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class SaleUpdateForm {
    private Integer seq;
    private String category;
    private String productNo;
    private String title;
    private Integer quantity;
    private Integer salePrice;
    private Integer deliveryFee;
    private String content;
    private Boolean useYn;

    private List<MultipartFile> thumbnails;
    private String[] deleteThumbnails;
    private List<MultipartFile> contentImages;
    private String[] deleteImages;
}
