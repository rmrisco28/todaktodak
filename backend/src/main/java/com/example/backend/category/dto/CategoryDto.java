package com.example.backend.category.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {
    private Integer seq;
    private String name;
    private String imageName;
    private Boolean useYn;

    private String path;

    public CategoryDto(Integer seq, String name, String imageName, Boolean useYn) {
        this.seq = seq;
        this.name = name;
        this.imageName = imageName;
        this.useYn = useYn;
    }
}
