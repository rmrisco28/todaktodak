package com.example.backend.rental.dto;

import com.example.backend.rental.entity.ReturnOrder;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link ReturnOrder}
 */
@Value
public class ReturnOrderUpdateDto implements Serializable {
    String returnNo;
    String rentalNoRentalNo;
    String rentalNoState;
    String saleNoSaleNo;
    String productNoProductNo;
    Integer productNoStock;
    String orderNoOrderNo;
    Integer orderNoOrderCount;
    String state;
}