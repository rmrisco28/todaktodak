package com.example.backend.rental.dto;

import com.example.backend.rental.entity.ReturnOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link ReturnOrder}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReturnOrderDto implements Serializable {
    Integer seq;
    String returnNo;
    String rentalNo;
    String saleNo;
    String productNo;

    String orderNo;
    String post;
    String addr;
    String addrDetail;
    String name;

    String phone;
    String content;
    LocalDateTime insertDttm;
    LocalDateTime updateDttm;
    String memberNo;

}