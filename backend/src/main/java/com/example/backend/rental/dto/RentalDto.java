package com.example.backend.rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.backend.rental.entity.Rental}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalDto implements Serializable {
    Integer seq;
    Integer orderNoOrderCount;
    String productNoName;
    Integer productNoPrice;
    String startDttm;
    String endDttm;
    String status;
}