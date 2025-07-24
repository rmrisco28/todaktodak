package com.example.backend.contact.dto;

import lombok.Data;

@Data
public class ContactModifyForm {
    private Integer seq;
    private String title;
    private String content;
    private String name;
}
