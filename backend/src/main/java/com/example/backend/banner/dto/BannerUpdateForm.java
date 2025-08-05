package com.example.backend.banner.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data
public class BannerUpdateForm {
    private Integer seq;
    private String title;
    private String name;
    private String link;
    private Boolean useYn;

    private MultipartFile image;
}
