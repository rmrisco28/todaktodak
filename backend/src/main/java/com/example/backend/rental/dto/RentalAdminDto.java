package com.example.backend.rental.dto;

import com.example.backend.rental.entity.Rental;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link Rental}
 */
@Value
public class RentalAdminDto implements Serializable {
    Integer seq;
    String rentalNo;
    String orderNoOrderNo;
    String orderNoName;
    String orderNoPhone;

    Integer orderNoOrderCount;
    String productNoProductNo;
    String productNoName;
    Integer productNoPrice;
    String startDttm;

    String endDttm;
    String state;
    Boolean useYn;
    Boolean delYn;
}