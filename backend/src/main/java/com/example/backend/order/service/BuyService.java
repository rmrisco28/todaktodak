package com.example.backend.order.service;

import com.example.backend.order.dto.OrderInfoDto;
import com.example.backend.order.entity.OrderInfo;
import com.example.backend.order.repository.OrderInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BuyService {

    private final OrderInfoRepository orderInfoRepository;

    public void buy(OrderInfoDto oid) {
        OrderInfo orderInfo = new OrderInfo();

        orderInfo.setName(oid.getName());
        orderInfo.setPhoneNo(oid.getPhoneNo());
        orderInfo.setPostCode(oid.getPostCode());
        orderInfo.setAddr(oid.getAddr());
        orderInfo.setAddrDetail(oid.getAddrDetail());
        orderInfo.setRequest(oid.getRequest());

        orderInfoRepository.save(orderInfo);
    }
}
