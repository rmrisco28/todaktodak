package com.example.backend.order.service;

import com.example.backend.common.Constant;
import com.example.backend.order.dto.*;
import com.example.backend.order.entity.OrderItem;
import com.example.backend.order.entity.OrderList;
import com.example.backend.order.entity.OrderManage;
import com.example.backend.order.repository.OrderItemRepository;
import com.example.backend.order.repository.OrderListRepository;
import com.example.backend.order.repository.OrderManageRepository;
import com.example.backend.sale.dto.SaleImageThumbDto;
import com.example.backend.sale.entity.Sale;
import com.example.backend.sale.entity.SaleImageThumb;
import com.example.backend.sale.repository.SaleImageThumbRepository;
import com.example.backend.sale.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service // ✅ 비즈니스 로직을 처리하는 서비스 계층 클래스
@RequiredArgsConstructor // ✅ 생성자 주입을 Lombok이 자동 생성
//@Transactional(readOnly = true) // 기본적으로 읽기 전용 트랜잭션 (조회용 서비스)
@Transactional
public class OrderService {

    private final SaleRepository saleRepository;
    @Value("${image.prefix}")
    private String imagePrefix;

    private final OrderManageRepository orderManageRepository; // 주문 정보 저장소
    private final OrderItemRepository orderItemRepository;     // 주문상품 저장소

    private final OrderListRepository orderListRepository;
    private final SaleImageThumbRepository saleImageThumbRepository;

    /**
     * 📌 주문 목록 조회
     * - 회원별로 주문 내역을 조건 필터링하여 조회
     * - 필터 조건: 상태, 날짜범위, 상품명 키워드
     *
     * @param memberSeq 회원 식별자
     * @param status    주문 상태 필터 (선택)
     * @param keyword   상품명 키워드 (선택)
     * @param startDate 시작일 필터 (선택)
     * @param endDate   종료일 필터 (선택)
     * @return 주문 목록 DTO 리스트
     */
    public List<OrderManageDto> findOrders(
            Integer memberSeq,
            String status,
            String keyword,
            LocalDate startDate,
            LocalDate endDate
    ) {
        // 🔍 해당 회원의 전체 주문 조회
        List<OrderManage> orderManages = orderManageRepository.findByMember_Seq(memberSeq);
        List<OrderManageDto> result = new ArrayList<>();

        for (OrderManage order : orderManages) {
            boolean matches = true;

            // ✅ 주문 상태 필터
            if (status != null && !status.isBlank()) {
                if (!status.equals(order.getStatus())) {
                    matches = false;
                }
            }

            // ✅ 시작일 필터
            if (startDate != null) {
                if (order.getOrderDate().toLocalDate().isBefore(startDate)) {
                    matches = false;
                }
            }

            // ✅ 종료일 필터
            if (endDate != null) {
                if (order.getOrderDate().toLocalDate().isAfter(endDate)) {
                    matches = false;
                }
            }

            // ✅ 키워드 필터 (상품명 포함 여부)
            if (keyword != null && !keyword.isBlank()) {
                boolean found = false;
                for (OrderItem item : order.getItems()) {
                    if (item.getProduct() != null && item.getProduct().getName() != null) {
                        if (item.getProduct().getName().contains(keyword)) {
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    matches = false;
                }
            }

            // ✅ 조건에 맞는 주문만 DTO 변환
            if (matches) {
                List<String> names = new ArrayList<>();
                for (OrderItem item : order.getItems()) {
                    if (item.getProduct() != null && item.getProduct().getName() != null) {
                        names.add(item.getProduct().getName());
                    }
                }

                String productNames = String.join(", ", names); // 상품명들 → 문자열

                OrderManageDto dto = new OrderManageDto(
                        order.getSeq(),
                        order.getOrderNo(),
                        order.getOrderDate(),
                        productNames,
                        order.getTotalPrice(),
                        order.getStatus(),
                        order.getTrackNo(),
                        order.getDelYn()
                );

                result.add(dto);
            }
        }

        return result;
    }

    /**
     * 📌 주문 상세 조회
     * - 주문 번호를 기반으로 주문 및 상품 정보 전체 조회
     *
     * @param orderSeq 주문 번호 (PK)
     * @return 주문 상세 DTO
     */
    public OrderDetailDto getOrderDetail(Integer orderSeq) {
        // 🔍 주문 조회
        OrderManage order = orderManageRepository.findById(orderSeq).orElse(null);

        // 🔍 주문 상품 목록 조회
        List<OrderItem> items = orderItemRepository.findByOrderManage(order);

        // ✅ DTO에 담을 정보 수집
        List<String> productNames = new ArrayList<>();
        List<Integer> quantities = new ArrayList<>();
        List<Integer> prices = new ArrayList<>();

        for (OrderItem item : items) {
            productNames.add(item.getProduct().getName());
            quantities.add(item.getQuantity());
            prices.add(item.getProduct().getPrice());
        }

        // ✅ 상세 DTO 생성 및 반환
        return new OrderDetailDto(
                order.getSeq(),
                order.getOrderNo(),
                order.getOrderDate(),
                productNames,
                quantities,
                prices,
                order.getTotalPrice(),
                order.getStatus(),
                order.getTrackNo()
        );
    }

    public Map<String, Object> listAll(String keyword, Integer pageNumber) {
        Page<OrderListAllDto> orderListDtoPage = orderListRepository.searchOrderListAll(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = orderListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "orderList", orderListDtoPage.getContent());
    }

    public OrderDto getOrderBySeq(Integer seq) {
        OrderDto dto = orderListRepository.findOrderDetailBySeq(seq);

        Sale sale = new Sale();
        sale.setSaleNo(dto.getSaleNo());
        sale = saleRepository.findBySaleNo(sale.getSaleNo());
        SaleImageThumb image = saleImageThumbRepository.findBySale(sale).getFirst();

        SaleImageThumbDto imageDto = new SaleImageThumbDto();
        imageDto.setName(image.getId().getName());
        imageDto.setPath(imagePrefix + "prj4/saleImageThumb/" + sale.getSeq() + "/" + image.getId().getName());

        dto.setImage(imageDto);

        return dto;
    }

    public boolean validateForStateUpdate(OrderStateUpdateForm dto) {
        String state = dto.getState();
        if (state == null || state.trim().isBlank()) {
            return false;
        }

        String prevState = orderListRepository.findBySeq(dto.getSeq()).getState();
        // 상태값에 따른 유효성 체크
        switch (prevState) {
            case Constant.ORDER_STATE_DELIVERY_READY
            , Constant.ORDER_STATE_DELIVERY_PROGRESS
            , Constant.ORDER_STATE_DELIVERY_COMPLETED -> {
                // 배송대기, 배송중, 배송완료
                if (dto.getDeliveryCompany() == null || dto.getDeliveryCompany().trim().isBlank()) {
                    return false;
                }
                if (dto.getTracking() == null || dto.getTracking().trim().isBlank()) {
                    return false;
                }
            }
        }

        return true;
    }

    public void update(OrderStateUpdateForm dto) {
        OrderList orderList = orderListRepository.findBySeq(dto.getSeq());

        if (!(orderList.getState()).equals(dto.getState())) {
            // 상태값이 변경된 경우
            String state = dto.getState();
            // 후처리
            processingByState(orderList, state);
            orderList.setState(state);
        }
        if (!(orderList.getRequest()).equals(dto.getRequest())) {
            // 요청사항 변경된 경우
            orderList.setRequest(dto.getRequest());
        }
        if (!(orderList.getDeliveryCompany()).equals(dto.getDeliveryCompany())) {
            // 배송업체 변경된 경우
            orderList.setDeliveryCompany(dto.getDeliveryCompany());
        }
        if (!(orderList.getTracking()).equals(dto.getTracking())) {
            // 운송장번호 변경된 경우
            orderList.setTracking(dto.getTracking());
        }

        orderList.setUpdateDttm(LocalDateTime.now());

        orderListRepository.save(orderList);

    }

    /**
     * 주문 상태값 변경에 따른 후처리
     *
     * @param orderList, state
     */
    private void processingByState(OrderList orderList, String state) {
        //* TODO [@MINKI] 후처리
        switch (state) {
            case Constant.ORDER_STATE_PAYMENT_COMPLETED -> {
                // 결제완료
                // - 결제 내역 데이터 삽입
            }
            case Constant.ORDER_STATE_RECEIVED_COMPLETED -> {
                // 수령완료
                // - 매출 관리 데이터 삽입
            }
            case Constant.ORDER_STATE_RETURN_COMPLETED -> {
                // 반송완료
                // - 결제 내역 상태값(취소) 업데이트
            }
            case Constant.ORDER_STATE_CANCEL_COMPLETED -> {
                // 취소완료
                // - 결제 내역 상태값(취소) 업데이트
            }


        }
    }

    public Map<String, Object> list(String memberId, Authentication authentication, String keyword, Integer pageNumber) {
        if (authentication == null) {
            throw new RuntimeException("권한이 없습니다.");
        }

        Page<OrderListAllDto> orderListDtoPage = orderListRepository.searchOrderListUser(memberId, keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = orderListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "orderList", orderListDtoPage.getContent());

    }

    public String findMemberByOrder(Integer seq) {
        return orderListRepository.findBySeq(seq).getName();
    }
}