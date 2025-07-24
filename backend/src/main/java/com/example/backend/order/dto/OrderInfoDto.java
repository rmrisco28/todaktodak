package com.example.backend.order.dto;

import com.example.backend.order.entity.OrderInfo;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link OrderInfo}
 */
@Data
public class OrderInfoDto implements Serializable {
    Integer id;
    String name;
    String phoneNo;
    String postCode;
    String addr;
    String addrDetail;
    String request;
}