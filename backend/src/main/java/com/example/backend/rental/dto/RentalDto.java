package com.example.backend.rental.dto;

import com.example.backend.order.entity.OrderList;
import com.example.backend.product.entity.Product;
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
    String rentalNo;
    Integer orderCount;
    String productName;
    Integer productPrice;

    String startDttm;
    String endDttm;
    String state;
    String orderName;
    String orderPost;

    String orderAddr;
    String orderAddrDetail;
    String orderPhone;
    String orderNo;
    String productNo;

    String SaleNo;
}