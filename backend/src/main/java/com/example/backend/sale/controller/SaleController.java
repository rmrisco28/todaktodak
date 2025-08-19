package com.example.backend.sale.controller;

import com.example.backend.sale.dto.SaleAddForm;
import com.example.backend.sale.dto.SaleDto;
import com.example.backend.sale.dto.SaleUpdateForm;
import com.example.backend.sale.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale")
public class SaleController {

    private final SaleService saleService;

    /**
     * 기능명: 판매 상품 등록 기능
     * 권한: 관리자
     *
     * @param dto
     * @return
     */
    @PostMapping("add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> add(SaleAddForm dto) {
        // validate
        boolean result = saleService.validateForAdd(dto);

        if (result) {
            saleService.add(dto);

            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "새 상품이 등록되었습니다.")));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error", "text", "입력한 내용이 유효하지 않습니다.")));
        }
    }

    /**
     * 판매상품 목록 조회 (사용자)
     *
     * @param keyword
     * @param pageNumber
     * @return
     */
    @GetMapping("list")
    public Map<String, Object> getAllSales(
            @RequestParam(value = "c", required = false) Integer category,
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "s", defaultValue = "12") Integer pageSize
    ) {
        return saleService.list(category, keyword, pageNumber, pageSize);
    }

    /**
     * 판매상품 상세 조회 (사용자)
     *
     * @param seq
     * @return
     */
    @GetMapping("detail/{seq}")
    public SaleDto getSaleBySeq(@PathVariable Integer seq) {
        updateViewCount(seq);
        return saleService.getSaleBySeq(seq);
    }

    /**
     * 판매상품 삭제
     *
     * @param seq
     * @return
     */
    @PutMapping("{seq}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> deleteSale(@PathVariable Integer seq) {
        try {
            saleService.updateDelYn(seq);
            return ResponseEntity.ok().body(Map.of("Message",
                    Map.of("type", "success", "text", seq + "번 판매상품이 삭제되었습니다.")));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }
    }

    /**
     * 판매상품 수정
     *
     * @param seq
     * @param dto
     * @return
     */
    @PutMapping("modify/{seq}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updateSale(@PathVariable Integer seq, SaleUpdateForm dto) {

        boolean result = saleService.validateForUpdate(dto);

        try {
            if (result) {
                saleService.update(dto);

                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", seq + " 번 판매상품이 수정되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "입력한 내용이 유효하지 않습니다.")));
            }

        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

    @PutMapping("update/view")
    public ResponseEntity<?> updateViewCount(Integer seq) {
        try {
            saleService.updateViewCount(seq);
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "조회수 업데이트 완료")));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }
    }
}
