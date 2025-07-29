package com.example.backend.contact.dto;

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
    LocalDateTime updateDttm;

}