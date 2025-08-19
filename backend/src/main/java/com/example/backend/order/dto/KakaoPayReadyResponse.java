package com.example.backend.order.dto;

import lombok.Data;

@Data
public class KakaoPayReadyResponse {
    private String tid;
    private String nextRedirectPcUrl;
}
