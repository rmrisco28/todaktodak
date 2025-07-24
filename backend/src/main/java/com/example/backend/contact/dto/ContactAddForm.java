package com.example.backend.contact.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ContactAddForm implements Serializable {
    String title;
    String content;
    String name;
}