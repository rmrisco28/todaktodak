package com.example.backend.rental.dto;

import com.example.backend.rental.entity.Rental;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link Rental}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalUpdateDto implements Serializable {
    String rentalNo;
    String orderNo;
    String orderNoState;
    String state;
    Integer orderNoOrderCount;
    String productNo;
}