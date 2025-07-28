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


}