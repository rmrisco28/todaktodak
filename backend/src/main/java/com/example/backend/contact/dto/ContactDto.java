package com.example.backend.contact.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;

/**
 * DTO for {@link com.example.backend.contact.entity.Contact}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactDto implements Serializable {
    Integer seq;
    String title;
    String name;
    Integer view;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime insertDttm;

    boolean delYn;
    boolean useYn;
    boolean replied;

    String reply;

    public ContactDto(Integer seq, String title, String name, Integer view, LocalDateTime insertDttm, boolean delYn, boolean useYn, String reply) {
        this.seq = seq;
        this.title = title;
        this.name = name;
        this.view = view;
        this.insertDttm = insertDttm;
        this.delYn = delYn;
        this.useYn = useYn;
        this.reply = reply;

        this.replied = !"아직 답변이 없습니다.".equals(reply);
    }
}