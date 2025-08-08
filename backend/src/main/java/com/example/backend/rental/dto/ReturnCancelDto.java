package com.example.backend.rental.dto;

import com.example.backend.rental.entity.ReturnOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link ReturnOrder}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReturnCancelDto implements Serializable {
    String rentalNo;
    String state;
    String rentalStatus;
}