package com.example.backend.banner.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BannerAddForm {
    private Integer seq;
    private String title;
    private String link;
    private MultipartFile image;
}
