package com.example.backend.order.service;

import com.example.backend.order.dto.KakaoPayApproveResponse;
import com.example.backend.order.dto.KakaoPayReadyResponse;
import com.example.backend.order.dto.KakaoPayRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class KakaoPayService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${kakaopay.api.key}")
    private String secretKey; // KakaoPay Secret key (dev)

    public KakaoPayReadyResponse kakaoPayReady(KakaoPayRequest request) {
        String url = "https://open-api.kakaopay.com/online/v1/payment/ready";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "SECRET_KEY " + secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> params = new HashMap<>();
        params.put("cid", "TC0ONETIME"); // 테스트용 CID
        params.put("partner_order_id", "1001");
        params.put("partner_user_id", "user1234");
        params.put("item_name", request.getItemName());
        params.put("quantity", request.getQuantity());
        params.put("total_amount", request.getTotalAmount());
        params.put("vat_amount", 0);
        params.put("tax_free_amount", 0);
        params.put("approval_url", "/payment/success");
        params.put("cancel_url", "/payment/cancel");
        params.put("fail_url", "/payment/fail");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        Map body = response.getBody();
        KakaoPayReadyResponse readyResponse = new KakaoPayReadyResponse();
        readyResponse.setTid((String) body.get("tid"));
        readyResponse.setNextRedirectPcUrl((String) body.get("next_redirect_pc_url"));

        return readyResponse;
    }

    public KakaoPayApproveResponse kakaoPayApprove(String tid, String pgToken) {
        String url = "https://open-api.kakaopay.com/online/v1/payment/approve";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "SECRET_KEY " + secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> params = new HashMap<>();
        params.put("cid", "TC0ONETIME");
        params.put("tid", tid);
        params.put("partner_order_id", "1001");
        params.put("partner_user_id", "user1234");
        params.put("pg_token", pgToken);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        Map body = response.getBody();
        KakaoPayApproveResponse approveResponse = new KakaoPayApproveResponse();
        approveResponse.setTid((String) body.get("tid"));
        approveResponse.setAid((String) body.get("aid"));
        approveResponse.setItemName((String) body.get("item_name"));
        approveResponse.setPaymentMethodType((String) body.get("payment_method_type"));
        approveResponse.setQuantity((Integer) body.get("quantity"));
        approveResponse.setAmount(((Map<String, Integer>) body.get("amount")).get("total"));

        return approveResponse;
    }
}

