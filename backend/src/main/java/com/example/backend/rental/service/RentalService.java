package com.example.backend.rental.service;

import com.example.backend.order.entity.OrderList;
import com.example.backend.order.repository.OrderListRepositoryMadeByGG;
import com.example.backend.product.entity.Product;
import com.example.backend.product.repository.ProductRepository;
import com.example.backend.rental.dto.*;
import com.example.backend.rental.entity.Rental;
import com.example.backend.rental.entity.ReturnOrder;
import com.example.backend.rental.repository.RentalRepository;
import com.example.backend.rental.repository.ReturnOrderRepository;
import com.example.backend.sale.entity.Sale;
import com.example.backend.sale.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
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

    // 렌탈 목록
    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<RentalListDto> rentalListDtoPage = rentalRepository.searchRentalList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = rentalListDtoPage.getTotalPages();

        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages, "rightPageNumber", rightPageNumber, "leftPageNumber", leftPageNumber, "currentPageNumber", pageNumber);

        //        rentalRepository.findAll();
        return Map.of("pageInfo", pageInfo, "rentalList", rentalListDtoPage.getContent());
    }

    // 렌탈 반납 현황
    public RentalDto returnDetail(Integer seq) {
        return rentalRepository.findRentalBySeq(seq);
    }

    // 렌탈 반납, 취소버튼
    public void processReturn(String rentalNo, String action, ReturnOrderDto rod) {
        Rental rental = rentalRepository.findByRentalNo(rentalNo).orElseThrow(() -> new RuntimeException("해당 대여를 찾을 수 없습니다."));

        Optional<ReturnOrder> optionalReturnOrder = returnOrderRepository.findByRentalNo(rental);

        if ("반납 신청".equals(action)) {
            ReturnOrder returnOrder;
            if (optionalReturnOrder.isPresent()) {
                // 기존 반납 내역 업데이트
                returnOrder = optionalReturnOrder.get();
            } else {
                // 신규 반납 내역 생성
                returnOrder = new ReturnOrder();
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

            rental.setState("반납 확인중");
            rentalRepository.save(rental);

        } else if ("반납 취소".equals(action)) {
            if (optionalReturnOrder.isEmpty()) {
                throw new RuntimeException("취소할 반납 신청이 존재하지 않습니다.");
            }

            ReturnOrder returnOrder = optionalReturnOrder.get();

            returnOrder.setState("대여중");
            rental.setState("대여중");

            returnOrderRepository.save(returnOrder);
            rentalRepository.save(rental);
        } else {
            throw new RuntimeException("잘못된 action 값입니다.");
        }
    }

    // 렌탈 연장 조회
    public RenewDto renewDetail(Integer seq) {
        return rentalRepository.findRenewBySeq(seq);

    }

    // 렌탈 연장
    public void renew(Integer seq, int period) {
        Rental rental = rentalRepository.findById(seq).orElseThrow(() -> new RuntimeException("대여 정보 찾을 수 없습니다."));

        // 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        LocalDate endDate = LocalDate.parse(rental.getEndDttm(), formatter);

        //연장
        LocalDate newEndDate = endDate.plusDays(period);

        // 다시 String으로 변환
        rental.setEndDttm(newEndDate.format(formatter));

        rentalRepository.save(rental);
    }

    public Map<String, Object> listAdmin(String keyword, Integer pageNumber) {
        Page<RentalAdminDto> rentalAdminDtoPage = rentalRepository.searchRentalAdminList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = rentalAdminDtoPage.getTotalPages();

        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages, "rightPageNumber", rightPageNumber, "leftPageNumber", leftPageNumber, "currentPageNumber", pageNumber);

        //        rentalRepository.findAll();
        return Map.of("pageInfo", pageInfo, "rentalAdminList", rentalAdminDtoPage.getContent());
    }

    public ResponseEntity<?> rentalUpdate(String rentalNo, RentalUpdateDto rud) {
        Rental rental = rentalRepository.findRentalByrentalNo(rentalNo);
        Optional<ReturnOrder> optionalReturnOrder = returnOrderRepository.findByRentalNo(rental);
        if (optionalReturnOrder.isPresent()) {
            System.out.println("rental = " + rental);
            System.out.println("rentalNo = " + rentalNo);
            System.out.println("rud = " + rud);

            rental.setState(rud.getState());

            ReturnOrder returnOrder = optionalReturnOrder.get();
            returnOrder.setState(rud.getState());

            // 반납으로 인한 재고 확보
            Product product = productRepository.findByProductNo(rud.getProductNo());
            product.setStock(product.getStock() - rud.getOrderNoOrderCount());

            rentalRepository.save(rental);
            returnOrderRepository.save(returnOrder);
            productRepository.save(product);

            return ResponseEntity.ok(Map.of("message", "반납 상태가 변경 되었습니다."));
        } else {
            return ResponseEntity.ok(Map.of("message", "반납 요청이 없습니다. \n 먼저 반납 신청 해주십시오."));
        }

    }
}

