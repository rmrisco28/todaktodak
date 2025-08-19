package com.example.backend.delivery.controller;

import com.example.backend.delivery.dto.TrackingResponseDto;
import com.example.backend.delivery.service.TrackingService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
@RequiredArgsConstructor
public class TrackingController {
    private final TrackingService trackingService;

    @GetMapping("/{courierCode}/{trackingNumber}")
    public ResponseEntity<TrackingResponseDto> trackPackage(
            @PathVariable String courierCode,
            @PathVariable String trackingNumber) {
        TrackingResponseDto trackingInfo = trackingService.getTrackingInfo(courierCode, trackingNumber);
        return ResponseEntity.ok(trackingInfo);
    }

    @GetMapping("/detail")
    public void tracking(HttpServletResponse response,
                         @RequestParam String t_code,
                         @RequestParam String t_invoice) throws IOException {

        trackingService.postTracking(response, t_code, t_invoice);
    }
}
