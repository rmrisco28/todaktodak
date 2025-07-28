package com.example.backend.order.service;

//import com.example.backend.member.repository.MemberRepository;

import com.example.backend.order.dto.ReturnAddDto;
import com.example.backend.order.entity.ProductOrder;
import com.example.backend.order.repository.ProductOrderRepository;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReturnService {
    private final ProductOrderRepository productOrderRepository;
    private final ProductRepository productRepository;
//    private final MemberRepository memberRepository;


    public void add(ReturnAddDto returnAddDto) {
        ProductOrder productOrder = new ProductOrder();
        productOrder.setOrdererName(returnAddDto.getOdrName());
        productOrder.setRentalDate(returnAddDto.getRentalDate());
        productOrder.setCount(returnAddDto.getCount());
        productOrder.setInsertDttn(returnAddDto.getInsertDttn());
        productOrder.setState(returnAddDto.getState());

        Product productNo = productRepository.findByProductNo(returnAddDto.getProductNo());
        productOrder.setProductNo(productNo);
//        Member memberNo = memberRepository.findByMemberNo(returnAddDto.getMemberNo());
//        productOrder.setMemberNo(memberNo);

        productOrderRepository.save(productOrder);
    }
}
