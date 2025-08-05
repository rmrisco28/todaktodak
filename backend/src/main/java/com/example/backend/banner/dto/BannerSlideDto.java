package com.example.backend.banner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BannerSlideDto {
    private Integer seq;
    private String title;
    private String name;
    private String link;

    private String path;

    public BannerSlideDto(Integer seq, String title, String name, String link) {
        this.seq = seq;
        this.title = title;
        this.name = name;
        this.link = link;
    }
}
