package com.example.backend.contact.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.example.backend.contact.entity.Contact}
 */
@Value
public class ContactDeletedDto implements Serializable {
    Integer seq;
    String title;
    String name;
    Integer view;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updateDttm;

}