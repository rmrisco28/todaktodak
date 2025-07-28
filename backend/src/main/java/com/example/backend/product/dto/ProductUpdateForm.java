package com.example.backend.product.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductUpdateForm {
    private Integer seq;
    private String category;
    private String brand;
    private String name;
    private String standard;
    private Integer stock;
    private Integer price;
    private String note;
    private Boolean useYn;

    private List<MultipartFile> images;
    private String[] deleteImages;

}
