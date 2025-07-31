package com.example.backend.sale.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class SaleAddForm {
    private String category;
    private String productNo;
    private String title;
    private Integer quantity;
    private Integer price;
    private Integer deliveryFee;
    private String content;
    private List<MultipartFile> thumbnails;
    private List<MultipartFile> contentImages;
}
