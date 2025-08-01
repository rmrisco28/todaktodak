package com.example.backend.order.service;

import com.example.backend.order.dto.OrderInfoDto;
import com.example.backend.order.entity.OrderInfo;
import com.example.backend.order.repository.OrderInfoRepository;
import com.example.backend.sale.dto.SaleDto;
import com.example.backend.sale.entity.Sale;
import com.example.backend.sale.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
public class BuyService {

    private final OrderInfoRepository orderInfoRepository;
    private final SaleRepository saleRepository;

    public void buy(OrderInfoDto oid) {
// 여기부터
        // 주문 배송, 결제 정보 order_no
        // 조합번호 생성 (코드 + 현재일자 + 시퀀스)
        String code = "ON";

        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
        String date = formatter.format(now);

        Integer maxSeq = orderInfoRepository.findMaxSeq();
        int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
        String seqStr = String.format("%07d", latestSeq);
// 여기까지
        Sale sale = saleRepository.findBySaleNo(oid.getSaleNo());

        OrderInfo orderInfo = new OrderInfo();

        orderInfo.setOrderNo(code + date + seqStr);

        orderInfo.setName(oid.getName());
        orderInfo.setPhoneNo(oid.getPhoneNo());
        orderInfo.setPostCode(oid.getPostCode());
        orderInfo.setSaleNo(sale);
        orderInfo.setAddr(oid.getAddr());
        orderInfo.setAddrDetail(oid.getAddrDetail());
        orderInfo.setRequest(oid.getRequest());
        orderInfo.setPrice(oid.getPrice());
        orderInfo.setDeliveryFee(oid.getDeliveryFee());
        orderInfo.setOrderCount(oid.getOrderCount());


        orderInfoRepository.save(orderInfo);
    }
}
