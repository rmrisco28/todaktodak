package com.example.backend.delivery.controller;

import com.example.backend.delivery.dto.DeliveryAddForm;
import com.example.backend.delivery.dto.DeliveryDto;
import com.example.backend.delivery.dto.DeliveryUpdateForm;
import com.example.backend.delivery.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    /**
     * 배송업체 등록
     *
     * @param dto
     * @return
     */
    @PostMapping("add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> add(DeliveryAddForm dto) {
        // validate
        boolean result = deliveryService.validateForAdd(dto);

        if (result) {
            deliveryService.add(dto);

            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "배송업체가 등록되었습니다.")));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error", "text", "입력한 내용이 유효하지 않습니다.")));
        }
    }

    /**
     * 배송업체 목록 조회
     *
     * @param keyword
     * @param pageNumber
     * @return
     */
    @GetMapping("list")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public Map<String, Object> getAllDeliveries(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return deliveryService.list(keyword, pageNumber);
    }

    /**
     * 배송업체 삭제
     *
     * @param seq
     * @return
     */
    @PutMapping("{seq}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> deleteDelivery(@PathVariable Integer seq) {

        try {
            deliveryService.updateDelYn(seq);
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "warning", "text", seq + "번 배송업체가 삭제되었습니다.")));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

    /**
     * 배송업체 수정Form 상세조회
     *
     * @param seq
     * @return
     */
    @GetMapping("detail/{seq}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public DeliveryDto getDeliveryBySeq(@PathVariable Integer seq) {
        return deliveryService.getDeliveryBySeq(seq);
    }

    /**
     * 배송업체 수정(update)
     *
     * @param seq
     * @param dto
     * @return
     */
    @PutMapping("modify/{seq}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updateDelivery(@PathVariable Integer seq, DeliveryUpdateForm dto) {
        boolean result = deliveryService.validateForUpdate(dto);
        try {
            if (result) {
                deliveryService.update(dto);
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", seq + " 번 배송업체가 수정되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "입력한 내용이 유효하지 않습니다.")));
            }
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }
    }

    /**
     * (FormSelect) 배송업체 목록 조회
     *
     * @return
     */
    @GetMapping("formSelect")
    public List<DeliveryDto> getAllDeliverys() {
        return deliveryService.deliveryList();
    }
}
