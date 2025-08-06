package com.example.backend.rental.dto;

import com.example.backend.rental.entity.Rental;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link Rental}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalListDto implements Serializable {
    Integer seq;
    String productNoName;
    Integer orderNoOrderCount;
    Integer productNoPrice;
    String startDttm;
    String endDttm;
    String status;
}