package com.example.backend.order.service;

import com.example.backend.order.dto.OrderInfoDto;
import com.example.backend.order.entity.OrderInfo;
import com.example.backend.order.repository.OrderInfoRepository;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import com.example.backend.rental.entity.Rental;
import com.example.backend.rental.repository.RentalRepository;
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
    private final RentalRepository rentalRepository;
    private final ProductRepository productRepository;

    public Integer buyAndRentalSave(OrderInfoDto oid) {
        // 결제 테이블 데이터 저장
        // 결제 코드 여기부터
        // 주문 배송, 결제 정보 order_no
        // 조합번호 생성 (코드 + 현재일자 + 시퀀스)

        String code = "ON";

        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
        String date = formatter.format(now);

        Integer maxSeq = orderInfoRepository.findMaxSeq();
        int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
        String seqStr = String.format("%07d", latestSeq);

        // 여기까지(결제코드)
        Sale sale = saleRepository.findBySaleNo(oid.getSaleNo());

        OrderInfo orderInfo = new OrderInfo();
        String orderNo = code + date + seqStr;
        orderInfo.setOrderNo(orderNo);


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

        // 렌탈 테이블
        // 렌탈 코드(여기부터)
        String rentalCode = "ON";

        Integer rentalMaxSeq = rentalRepository.findMaxSeq();
        int rentalLatestSeq = (rentalMaxSeq != null) ? rentalMaxSeq + 1 : 1;
        String rentalSeqStr = String.format("%07d", rentalLatestSeq);

        String rentalNo = rentalCode + date + rentalSeqStr;

        // 렌탈코드 (여기까지)
        Rental rental = new Rental();
        rental.setRentalNo(rentalNo);

//        OrderInfo orderInfoRental = new OrderInfo();
//        orderInfoRental.setOrderCount(rsd.getOrderNoOrderCount());
        rental.setOrderNo(orderInfo);


        Product product = productRepository.findByProductNo(oid.getProductNo());

        rental.setProductNo(product);

        rental.setStartDttm(date);
        rental.setEndDttm(date);


        rentalRepository.save(rental);

        return maxSeq;
    }

}
