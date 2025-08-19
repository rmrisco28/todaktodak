package com.example.backend.delivery.service;

import com.example.backend.delivery.dto.TrackingResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TrackingService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${delivery.tracking.api.key}")
    private String apiKey;

    public TrackingResponseDto getTrackingInfo(String courierCode, String trackingNumber) {
        // 스윗트래커 API URL (문서 참고)
        String apiUrl = "http://info.sweettracker.co.kr/api/v1/trackingInfo";

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("t_key", apiKey)
                .queryParam("t_code", courierCode)
                .queryParam("t_invoice", trackingNumber);

        // 외부 API 호출 및 응답 받기
        // 실제로는 스윗트래커가 주는 응답 객체에 맞춰 매핑해야 합니다.
        // 여기서는 개념 설명을 위해 가상의 Map으로 받습니다.
        Map<String, Object> response = restTemplate.getForObject(builder.toUriString(), Map.class);

        // 받은 응답(response)을 위에서 만든 DTO로 변환하는 로직
        // ...
        // 예시:
        // TrackingResponseDto trackingResponse = new TrackingResponseDto();
        // trackingResponse.setCourierName((String) response.get("carrierName"));
        // List<Map<String, String>> trackingDetailsFromApi = (List<Map<String, String>>) response.get("trackingDetails");
        // ... for문을 돌면서 trackingResponse.getTrackingDetails().add(new TrackingDetailDto(...));

        return convertResponseToDto(response); // 가공된 DTO 반환
    }

    // 외부 API 응답을 우리 DTO로 변환하는 private 메소드
    private TrackingResponseDto convertResponseToDto(Map<String, Object> apiResponse) {
        // ... 실제 변환 로직 구현 ...
        return new TrackingResponseDto();
    }

    public void postTracking(HttpServletResponse response, String code, String invoice) throws IOException {
        String form = "<form id='trackingForm' action='https://info.sweettracker.co.kr/tracking/4' method='post'>" +
                "<input type='hidden' name='t_key' value='" + apiKey + "'/>" +
                "<input type='hidden' name='t_code' value='" + code + "'/>" +
                "<input type='hidden' name='t_invoice' value='" + invoice + "'/>" +
                "</form>" +
                "<script>document.getElementById('trackingForm').submit();</script>";

        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write(form);
    }
}
