package com.example.backend.banner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BannerDto {
    private Integer seq;
    private String title;
    private String name;
    private String link;
    private Boolean useYn;
    private LocalDateTime insertDttm;
    private LocalDateTime updateDttm;

    private String path;

    public BannerDto(Integer seq, String title, String name, String link, Boolean useYn, LocalDateTime insertDttm, LocalDateTime updateDttm) {
        this.seq = seq;
        this.title = title;
        this.name = name;
        this.link = link;
        this.useYn = useYn;
        this.insertDttm = insertDttm;
        this.updateDttm = updateDttm;
    }
}
