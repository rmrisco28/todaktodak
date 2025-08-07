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


    public void returnOrder(ReturnOrderDto rod) {
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


        Rental rental = rentalRepository.findByRentalNo(rod.getRentalNo());
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


        Rental rental = rentalRepository.findStatusByRentalNo(rcd.getRentalNo());
        rental.setRentalNo(rcd.getRentalNo());
        ReturnOrder returnOrder = returnOrderRepository.findStateByRentalNo(rental);

        returnOrder.setState(rcd.getState());

        rental.setStatus(rcd.getRentalStatus());

        returnOrderRepository.save(returnOrder);
        rentalRepository.save(rental);
    }
}
