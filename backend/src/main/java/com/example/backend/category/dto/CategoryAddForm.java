package com.example.backend.category.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryAddForm {
    private String name;

    private MultipartFile image;
}
