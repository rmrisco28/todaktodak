package com.example.backend.category.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryUpdateForm {
    private Integer seq;
    private String name;
    private String imageName;

    private MultipartFile image;
}
