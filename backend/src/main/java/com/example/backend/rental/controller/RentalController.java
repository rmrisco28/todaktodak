package com.example.backend.rental.controller;

import com.example.backend.rental.dto.RentalDto;
import com.example.backend.rental.entity.Rental;
import com.example.backend.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        return rentalService.detail(seq);
    }
}
