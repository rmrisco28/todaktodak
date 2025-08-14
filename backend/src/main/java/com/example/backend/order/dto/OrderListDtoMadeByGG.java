package com.example.backend.order.dto;

import com.example.backend.order.entity.OrderList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link OrderList}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderListDtoMadeByGG implements Serializable {
    String orderNo;
    String saleSaleNo;
    String name;
    String recipient;

    String phone;
    String post;
    String addr;
    String addrDetail;
    String request;

    Integer totalPrice;
    Integer deliveryFee;
    Integer totProdPrice;
    Integer prodPrice;
    Integer orderCount;

    Integer rentalPeriod;
    String state;
    String deliveryCompany;
    String tracking;
    String ProductNo;

    String saleProductNoProductNo;
    Integer saleProductNoStock;
    String memberMemberId;

//    LocalDateTime insertDttm;
//
//    LocalDateTime updateDttm;
//    Boolean useYn;
//    Boolean delYn;
}