package com.example.backend.order.service;

import com.example.backend.common.Constant;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import com.example.backend.order.dto.OrderListDtoMadeByGG;
import com.example.backend.order.entity.OrderList;
import com.example.backend.order.repository.OrderListRepositoryMadeByGG;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import com.example.backend.rental.entity.Rental;
import com.example.backend.rental.repository.RentalRepository;
import com.example.backend.sale.entity.Sale;
import com.example.backend.sale.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BuyService {

    private final OrderListRepositoryMadeByGG orderListRepositoryMadeByGG;
    private final SaleRepository saleRepository;
    private final RentalRepository rentalRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    public void buyAndRentalSave(OrderListDtoMadeByGG old, Authentication authentication) {
        // 결제 테이블 데이터 저장
        // 결제 코드 여기부터
        // 주문 배송, 결제 정보 order_no
        // 조합번호 생성 (코드 + 현재일자 + 시퀀스)

        String code = "OR";

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter_ymd = DateTimeFormatter.ofPattern("yyMMdd");
        String date = today.format(formatter_ymd);

        Integer maxSeq = orderListRepositoryMadeByGG.findMaxSeq();
        int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
        String seqStr = String.format("%07d", latestSeq);

        // 여기까지(결제코드)
        Sale sale = saleRepository.findBySaleNo(old.getSaleSaleNo());

        Member member = memberRepository.findByMemberId(old.getMemberMemberId())
                .orElseThrow(() -> new RuntimeException("회원 없음: " + old.getMemberMemberId()));


        OrderList orderList = new OrderList();
        System.out.println("old.getTotalPrice() = " + old.getTotalPrice());
        System.out.println("old.getTotProdPrice() = " + old.getTotProdPrice());
        System.out.println("old.getProdPrice() = " + old.getProdPrice());

        String orderNo = code + date + seqStr;
        orderList.setOrderNo(orderNo);
        orderList.setSaleNo(sale);
        orderList.setMemberNo(member);


        orderList.setName(authentication.getName());
        orderList.setRecipient(old.getRecipient());

        orderList.setPhone(old.getPhone());
        orderList.setPost(old.getPost());
        orderList.setAddr(old.getAddr());
        orderList.setAddrDetail(old.getAddrDetail());
        orderList.setRequest(old.getRequest());

        orderList.setTotalPrice(old.getTotalPrice());
        orderList.setDeliveryFee(old.getDeliveryFee());
        orderList.setTotProdPrice(old.getTotProdPrice());
        orderList.setProdPrice(old.getProdPrice());
        orderList.setOrderCount(old.getOrderCount());

        orderList.setRentalPeriod(old.getRentalPeriod());
//        orderList.setState(old.getState()); 기본값 대여중
        orderList.setState(Constant.ORDER_STATE_PAYMENT_COMPLETED); // 결제완료
        orderList.setDeliveryCompany(old.getDeliveryCompany());
        orderList.setTracking(old.getTracking());


        // 렌탈 테이블
        // 렌탈 코드(여기부터)
        String rentalCode = "RT";

        Integer rentalMaxSeq = rentalRepository.findMaxSeq();
        int rentalLatestSeq = (rentalMaxSeq != null) ? rentalMaxSeq + 1 : 1;
        String rentalSeqStr = String.format("%07d", rentalLatestSeq);

        String rentalNo = rentalCode + date + rentalSeqStr;

        // 렌탈코드 (여기까지)
        Rental rental = new Rental();
        rental.setRentalNo(rentalNo);
        rental.setMemberNo(member);

//        OrderInfo orderInfoRental = new OrderInfo();
//        orderInfoRental.setOrderCount(rsd.getOrderNoOrderCount());
        rental.setOrderNo(orderList);


        Product product = productRepository.findByProductNo(old.getProductNo());
        rental.setProductNo(product);

        DateTimeFormatter formatter_ymdChange = DateTimeFormatter.ofPattern("yyMMdd");

        String startDttm = today.format(formatter_ymdChange);
        LocalDate endDate = today.plusDays(60);
        String endDttm = endDate.format(formatter_ymdChange);

        rental.setStartDttm(startDttm);
        rental.setEndDttm(endDttm);

        // 재고 수량 변경
        product.setStock(product.getStock() - old.getOrderCount());


        orderListRepositoryMadeByGG.save(orderList);

        rentalRepository.save(rental);


    }

}
