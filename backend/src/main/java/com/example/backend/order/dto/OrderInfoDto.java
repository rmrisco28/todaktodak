package com.example.backend.order.dto;

import com.example.backend.order.entity.OrderInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link OrderInfo}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderInfoDto implements Serializable {
    private Integer seq;
    private String name;
    private String phoneNo;
    private String saleNo;
    private String postCode;
    private String addr;
    private String addrDetail;
    private String request;
    private Integer price;
    private Integer deliveryFee;
    private Integer orderCount;
    private String productNo;
}