package com.example.backend.rental.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.backend.rental.entity.Rental}
 */
@Value
public class RenewDto implements Serializable {
    Integer seq;
    String rentalNo;
    String orderNoOrderNo;
    String orderNoName;
    String orderNoPhone;

    Integer orderNoOrderCount;
    String productNoProductNo;
    String productNoName;
    String startDttm;
    String endDttm;

    String state;

}