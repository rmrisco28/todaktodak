package com.example.backend.sale.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleListDto {
    private Integer seq;
    private String thumbnail;
    private String thumbnailPath;
    private String title;
    private Integer salePrice;
    private String saleNo;
    private LocalDateTime insertDttm;

    public SaleListDto(Integer seq, String name, String title, Integer salePrice, String saleNo, LocalDateTime insertDttm) {
        this.seq = seq;
        this.thumbnail = name;
        this.title = title;
        this.salePrice = salePrice;
        this.saleNo = saleNo;
        this.insertDttm = insertDttm;
    }

    public String getTimesAgo() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime insertDttm = this.getInsertDttm();

        Duration duration = Duration.between(insertDttm, now);

        long seconds = duration.toSeconds();

        if (seconds < 60) {                 // 1분 이내
            return "방금 전";
        } else if (seconds < 3600) {        // 1시간 이내
            long minutes = seconds / 60;
            return minutes + " 분 전";
        } else if (seconds < 60 * 60 * 24) {       // 1일 이내
            long hours = seconds / 3600;
            return hours + " 시간 전";
        } else if (seconds < 3600 * 24 * 7) {       // 1주일
            long days = seconds / 3600 / 24;
            return days + " 일 전";
        } else if (seconds < 3600 * 24 * 7 * 4) {       // 4주 이내
            long weeks = seconds / 3600 / 24 * 7;
            return weeks + " 주 전";
        } else {
            long days = duration.toDays();
            long years = days / 365;
            return years + " 년 전";
        }
    }
}
