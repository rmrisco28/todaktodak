package com.example.backend.contact.dto;

import com.example.backend.contact.entity.Contact;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link Contact}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactAddForm implements Serializable {
    String title;
    String name;
    String content;
    String reply;
    Boolean useYn;
    String memberNoMemberId;
}