package com.example.backend.rental.controller;

import com.example.backend.rental.dto.RentalDto;
import com.example.backend.rental.dto.ReturnCancelDto;
import com.example.backend.rental.dto.ReturnOrderDto;
import com.example.backend.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rental/")
public class RentalController {

    private final RentalService rentalService;

    @GetMapping("list")
    public Map<String, Object> rentalList(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return rentalService.list(keyword, pageNumber);
    }

    @GetMapping("return/{seq}")
    public RentalDto detail(@PathVariable Integer seq) {
        return rentalService.returnDetail(seq);
    }

    @PostMapping("return/finish")
    public ResponseEntity<?> returnOrder(@RequestBody ReturnOrderDto rod) {
        rentalService.returnOrder(rod);

        return ResponseEntity.ok(Map.of("message", "반납 요청 완료되었습니다."));
    }

    @PutMapping("return/cancel/{seq}")
    public ResponseEntity<?> returnCancel(@PathVariable Integer seq, @RequestBody ReturnCancelDto rcd) {
        rcd.setSeq(seq);
        rentalService.returnCancel(rcd);
        return ResponseEntity.ok(Map.of("message", "반납 요청이 취소되었습니다."));
    }

}
