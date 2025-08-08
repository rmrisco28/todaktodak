package com.example.backend.order.dto;

import com.example.backend.sale.dto.SaleImageThumbDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Integer seq;
    // 주문 (상품) 정보
    private String saleNo;
    private String saleTitle;
    private String orderNo;
    private Integer prodPrice;
    private Integer orderCount;
    private Integer rentalPeriod;
    private String state;
    private LocalDateTime insertDttm;

    private SaleImageThumbDto image;

    // 배송 정보
    private String recipient;
    private String phone;
    private String post;
    private String addr;
    private String addrDetail;
    private String request;
    private String deliveryCompany;
    private String tracking;

    // 결제 정보
    private Integer totalPrice;
    private Integer deliveryFee;
    private Integer totProdPrice;

    public OrderDto(Integer seq, String saleNo, String saleTitle, String orderNo, Integer prodPrice, Integer orderCount, Integer rentalPeriod, String state, LocalDateTime insertDttm, String recipient, String phone, String post, String addr, String addrDetail, String request, String deliveryCompany, String tracking, Integer totalPrice, Integer deliveryFee, Integer totProdPrice) {
        this.seq = seq;
        this.saleTitle = saleTitle;
        this.saleNo = saleNo;
        this.orderNo = orderNo;
        this.prodPrice = prodPrice;
        this.orderCount = orderCount;
        this.rentalPeriod = rentalPeriod;
        this.state = state;
        this.insertDttm = insertDttm;
        this.recipient = recipient;
        this.phone = phone;
        this.post = post;
        this.addr = addr;
        this.addrDetail = addrDetail;
        this.request = request;
        this.deliveryCompany = deliveryCompany;
        this.tracking = tracking;
        this.totalPrice = totalPrice;
        this.deliveryFee = deliveryFee;
        this.totProdPrice = totProdPrice;
    }
}
