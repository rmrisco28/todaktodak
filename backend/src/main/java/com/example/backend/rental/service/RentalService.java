package com.example.backend.rental.service;

import com.example.backend.order.entity.OrderList;
import com.example.backend.order.repository.OrderListRepositoryMadeByGG;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import com.example.backend.rental.dto.RentalDto;
import com.example.backend.rental.dto.RentalListDto;
import com.example.backend.rental.dto.ReturnOrderDto;
import com.example.backend.rental.entity.Rental;
import com.example.backend.rental.dto.ReturnCancelDto;
import com.example.backend.rental.entity.ReturnOrder;
import com.example.backend.rental.repository.RentalRepository;
import com.example.backend.rental.repository.ReturnOrderRepository;
import com.example.backend.sale.entity.Sale;
import com.example.backend.sale.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RentalService {

    private final RentalRepository rentalRepository;
    private final ReturnOrderRepository returnOrderRepository;
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final OrderListRepositoryMadeByGG orderListRepositoryMadeByGG;

    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<RentalListDto> rentalListDtoPage = rentalRepository.searchRentalList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = rentalListDtoPage.getTotalPages();

        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        //        rentalRepository.findAll();
        return Map.of("pageInfo", pageInfo, "rentalList", rentalListDtoPage.getContent());
    }

    public RentalDto returnDetail(Integer seq) {
        return rentalRepository.findRentalBySeq(seq);
    }


/*    public void returnOrder(ReturnOrderDto rod) {

        System.out.println("rod = " + rod);

        String code = "RET";

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter_ymd = DateTimeFormatter.ofPattern("yyMMdd");
        String date = today.format(formatter_ymd);

        Integer maxSeq = returnOrderRepository.findMaxSeq();
        int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
        String seqStr = String.format("%07d", latestSeq);


        ReturnOrder returnOrder = new ReturnOrder();
        String returnNo = code + date + seqStr;
        returnOrder.setReturnNo(returnNo);
        returnOrder.setPost(rod.getPost());
        returnOrder.setAddr(rod.getAddr());
        returnOrder.setAddrDetail(rod.getAddrDetail());
        returnOrder.setName(rod.getName());
        returnOrder.setContent(rod.getContent());
        returnOrder.setPhone(rod.getPhone());


        Rental rental = rentalRepository.findByRentalNo(rod.getRentalNo())
                .orElseThrow(() -> new RuntimeException("해당 대여를 확인 할 수 없습니다."));
        returnOrder.setRentalNo(rental);
        Sale sale = saleRepository.findBySaleNo(rod.getSaleNo());
        returnOrder.setSaleNo(sale);
        Product product = productRepository.findByProductNo(rod.getProductNo());
        returnOrder.setProductNo(product);
        OrderList orderList = orderListRepositoryMadeByGG.findByOrderNo(rod.getOrderNo());
        returnOrder.setOrderNo(orderList);

        returnOrderRepository.save(returnOrder);

        System.out.println("returnOrder = " + returnOrder);

        // 렌탈 현황 변경
        rental.setStatus("반납 확인중");

    }

    public void returnCancel(ReturnCancelDto rcd) {

        Rental rental = rentalRepository.findByRentalNo(rcd.getRentalNo())
                .orElseThrow(() -> new RuntimeException("해당 대여를 찾을 수 없습니다."));


        ReturnOrder returnOrder = returnOrderRepository.findByRentalNo(rental)
                .orElseThrow(() -> new RuntimeException("해당 대여의 반납 신청을 찾을 수 없습니다."));

        returnOrder.setState(rcd.getState());
        rental.setStatus(rcd.getRentalStatus());

        returnOrderRepository.save(returnOrder);
        rentalRepository.save(rental);
    }*/

    public void processReturn(String rentalNo, String action, ReturnOrderDto rod) {
        Rental rental = rentalRepository.findByRentalNo(rentalNo)
                .orElseThrow(() -> new RuntimeException("해당 대여를 찾을 수 없습니다."));

        Optional<ReturnOrder> optionalReturnOrder = returnOrderRepository.findByRentalNo(rental);

        if ("반납 신청".equals(action)) {
            ReturnOrder returnOrder;
            if (optionalReturnOrder.isPresent()) {
                // 기존 반납 내역 업데이트
                returnOrder = optionalReturnOrder.get();
            } else {
                // 신규 반납 내역 생성
                returnOrder = new ReturnOrder();
                // returnNo 생성로직 여기에 추가
                String code = "RET";

                LocalDate today = LocalDate.now();
                DateTimeFormatter formatter_ymd = DateTimeFormatter.ofPattern("yyMMdd");
                String date = today.format(formatter_ymd);

                Integer maxSeq = returnOrderRepository.findMaxSeq();
                int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
                String seqStr = String.format("%07d", latestSeq);

                String returnNo = code + date + seqStr;
                returnOrder.setReturnNo(returnNo);

                returnOrder.setRentalNo(rental);
            }

            // dto rod가 null이 아니므로 값 세팅
            returnOrder.setState("반납 확인중");
            returnOrder.setPost(rod.getPost());
            returnOrder.setAddr(rod.getAddr());
            returnOrder.setAddrDetail(rod.getAddrDetail());
            returnOrder.setName(rod.getName());
            returnOrder.setContent(rod.getContent());
            returnOrder.setPhone(rod.getPhone());

            Sale sale = saleRepository.findBySaleNo(rod.getSaleNo());
            returnOrder.setSaleNo(sale);
            Product product = productRepository.findByProductNo(rod.getProductNo());
            returnOrder.setProductNo(product);
            OrderList orderList = orderListRepositoryMadeByGG.findByOrderNo(rod.getOrderNo());
            returnOrder.setOrderNo(orderList);

            returnOrderRepository.save(returnOrder);

            rental.setStatus("반납 확인중");
            rentalRepository.save(rental);

        } else if ("반납 취소".equals(action)) {
            if (optionalReturnOrder.isEmpty()) {
                throw new RuntimeException("취소할 반납 신청이 존재하지 않습니다.");
            }

            ReturnOrder returnOrder = optionalReturnOrder.get();

            returnOrder.setState("대여중");
            rental.setStatus("대여중");

            returnOrderRepository.save(returnOrder);
            rentalRepository.save(rental);
        } else {
            throw new RuntimeException("잘못된 action 값입니다.");
        }
    }
}

