package com.example.backend.contact.dto;

import com.example.backend.contact.entity.Contact;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link Contact}
 */
@Data
@NoArgsConstructor
public class ReplyDto implements Serializable {
    private Integer seq;
    private String reply;
    private LocalDateTime replyDttm;
}