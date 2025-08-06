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
public class RentalSaveDto implements Serializable {
    String rentalNo;
    Integer orderNo;
    String productNo;
    String state;

}