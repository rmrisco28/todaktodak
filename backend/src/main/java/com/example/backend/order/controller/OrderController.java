package com.example.backend.order.controller;

import com.example.backend.order.dto.OrderDto;
import com.example.backend.order.dto.OrderManageDto;
import com.example.backend.order.dto.OrderStateUpdateForm;
import com.example.backend.order.service.OrderService;
import com.example.backend.product.dto.ProductUpdateForm;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController // ✅ REST API 컨트롤러로 동작하도록 지정 (View 반환 X, JSON 반환 O)
@RequestMapping("/api/order") // ✅ 공통 URL 경로 설정
@RequiredArgsConstructor // ✅ 생성자 주입 자동 생성 (final 필드 대상)
public class OrderController {

    private final OrderService orderService;

    /**
     * ✅ 주문 목록 조회 API
     * - 회원 번호를 기준으로 자신의 주문 내역을 조회
     * - 상태, 키워드(상품명), 날짜범위 필터 가능
     *
     * @param memberSeq 회원 PK (기본값 1, 테스트용)
     * @param status    주문 상태 필터 (선택)
     * @param keyword   상품명 검색어 (선택)
     * @param startDate 시작일 필터 (선택)
     * @param endDate   종료일 필터 (선택)
     * @return 주문 목록 DTO 리스트
     */
    /*
    @GetMapping("/list")
    public List<OrderManageDto> getOrders(
            @RequestParam(defaultValue = "1") Integer memberSeq,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return orderService.findOrders(memberSeq, status, keyword, startDate, endDate);
    }
*/
    /**
     * ✅ 주문 상세 조회 API
     * - 주문 번호(PK)를 기준으로 상세 정보 반환
     *
     * @param orderSeq 주문 기본키
     * @return 주문 상세 정보 DTO
     */
    /*
    @GetMapping("/detail")
    public ResponseEntity<OrderDetailDto> OrderDetail(@RequestParam Integer orderSeq) {
        return ResponseEntity.ok(orderService.getOrderDetail(orderSeq));
    }

*/

    /**
     * 주문관리 목록 조회 (사용자)
     *
     * @param memberId
     * @return
     */
    @GetMapping("list/{memberId}")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> getOrders(@PathVariable String memberId,
                                         Authentication authentication,
                                         @RequestParam(value = "q", defaultValue = "") String keyword,
                                         @RequestParam(value = "p", defaultValue = "1") Integer pageNumber) {
        return orderService.list(memberId, authentication, keyword, pageNumber);
    }

    /**
     * 주문관리 목록 조회 (관리자)
     *
     * @param keyword
     * @param pageNumber
     * @return
     */
    @GetMapping("admin/list")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public Map<String, Object> getAllOrders(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return orderService.listAll(keyword, pageNumber);
    }

    /**
     * 주문관리 상세 조회 (관리자)
     *
     * @param seq
     * @return
     */
    @GetMapping("detail/{seq}")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> getOrderBySeq(@PathVariable Integer seq, Authentication authentication) {
        Boolean hasAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("SCOPE_ROLE_ADMIN"));
        String memberId = "";
        if (authentication.isAuthenticated() &&
                !hasAdmin) {
            memberId = orderService.findMemberByOrder(seq);
        }

        if (authentication.getName().equals(memberId) || hasAdmin) {
            return ResponseEntity.ok().body(orderService.getOrderBySeq(seq));
        } else {
            return ResponseEntity.status(403).build();
        }
    }


    /**
     * 주문 상태 수정
     *
     * @param seq
     * @param dto
     * @return
     */
    @PutMapping("modify/{seq}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updateOrderState(@PathVariable Integer seq, OrderStateUpdateForm dto) {
        dto.setSeq(seq);
        boolean result = orderService.validateForStateUpdate(dto);

        try {
            if (result) {
                orderService.update(dto);

                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", seq + " 번 주문이 업데이트되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "입력한 내용이 유효하지 않습니다.")));
            }

        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

}