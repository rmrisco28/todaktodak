package com.example.backend.rental.dto;

import com.example.backend.rental.entity.ReturnOrder;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link ReturnOrder}
 */
@Value
public class ReturnOrderContentDto implements Serializable {
    String returnNo;
    String rentalNoRentalNo;
    String rentalNoState;
    String content;
    String state;
    LocalDateTime updateDttm;
}