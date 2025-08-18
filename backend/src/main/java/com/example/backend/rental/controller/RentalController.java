package com.example.backend.rental.controller;

import com.example.backend.rental.dto.*;
import com.example.backend.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rental/")
public class RentalController {

    private final RentalService rentalService;

    // 렌탈 리스트
    @GetMapping("list")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> rentalList(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber,
            Authentication authentication) {
        return rentalService.list(keyword, pageNumber, authentication);
    }

    // 렌탈 반납 세부 현황
    @GetMapping("return/{seq}")
    public RentalDto detail(@PathVariable Integer seq) {
        return rentalService.returnDetail(seq);
    }

    // 렌탈 반납 확인버튼
    @PostMapping("return/finish")
    public ResponseEntity<?> returnOrder(@RequestBody ReturnOrderDto rod) {
        rentalService.processReturn(rod.getRentalNo(), "반납 신청", rod);
        return ResponseEntity.ok(Map.of("message", "반납 요청 완료되었습니다."));
    }

    // 렌탈 반납 취소 버튼
    @PutMapping("return/cancel/{rentalNo}")
    public ResponseEntity<?> returnCancel(
            @PathVariable String rentalNo,
            @RequestBody ReturnOrderDto rod) {
        rentalService.processReturn(rentalNo, "반납 취소", rod);
        return ResponseEntity.ok(Map.of("message", "반납 요청이 취소되었습니다."));
    }

    // 렌탈 연장 현황
    @GetMapping("renew/{seq}")
    public RenewDto renew(@PathVariable Integer seq) {
        return rentalService.renewDetail(seq);

    }


    // 렌탈 연장 버튼
    @GetMapping("renew/finish/{seq}")
    public ResponseEntity<?> renew(@PathVariable Integer seq,
                                   @RequestParam int period) {
        rentalService.renew(seq, period);
        return ResponseEntity.ok(Map.of("message", "연장 신청이 완료되었습니다."));
    }

    // 관리자 렌탈 현황 조회
    @GetMapping("list/admin")
    public Map<String, Object> rentalListAdmin(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return rentalService.listAdmin(keyword, pageNumber);
    }

    @PutMapping("list/update/{rentalNo}")
    public ResponseEntity<?> rentalUpdate(
            @PathVariable String rentalNo,
            @RequestBody RentalUpdateDto rud) {
        ResponseEntity<?> responseEntity = rentalService.rentalUpdate(rentalNo, rud);
        return responseEntity;
    }

}
